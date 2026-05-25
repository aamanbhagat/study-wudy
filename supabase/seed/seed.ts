// Run with: npx ts-node supabase/seed/seed.ts (after env is set up)
// Or use Supabase CLI: supabase db reset && tsx supabase/seed/seed.ts
import { createClient } from "@supabase/supabase-js";
import { CURRICULUM } from "../../lib/curriculum-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.");
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function seed() {
  for (const [fi, field] of CURRICULUM.entries()) {
    const { data: insertedField, error: fieldErr } = await supabase
      .from("fields")
      .upsert(
        {
          key: field.key,
          name: field.name,
          description: field.tagline,
          position: fi,
        },
        { onConflict: "key" },
      )
      .select()
      .single();
    if (fieldErr) throw fieldErr;
    if (!insertedField) throw new Error(`Failed to insert field ${field.key}`);

    for (const [pi, phase] of field.phases.entries()) {
      const { data: insertedPhase, error: phaseErr } = await supabase
        .from("phases")
        .upsert(
          {
            field_id: insertedField.id,
            number: phase.number,
            title: phase.title,
            subtitle: phase.subtitle,
            est_duration: phase.duration,
            position: pi,
          },
          { onConflict: "field_id,number" },
        )
        .select()
        .single();
      if (phaseErr) throw phaseErr;
      if (!insertedPhase) throw new Error(`Failed to insert phase ${phase.id}`);

      for (const [ti, topic] of phase.topics.entries()) {
        const { data: insertedTopic, error: topicErr } = await supabase
          .from("topics")
          .upsert(
            {
              phase_id: insertedPhase.id,
              field_id: insertedField.id,
              number: topic.number,
              title: topic.title,
              position: ti,
            },
            { onConflict: "phase_id,number" },
          )
          .select()
          .single();
        if (topicErr) throw topicErr;
        if (!insertedTopic) throw new Error(`Failed to insert topic ${topic.id}`);

        const subtopicRows = topic.subtopics.map((s, si) => ({
          topic_id: insertedTopic.id,
          title: s.title,
          position: si,
        }));
        const { error: subErr } = await supabase.from("subtopics").insert(subtopicRows);
        if (subErr && !subErr.message.includes("duplicate")) throw subErr;
      }
    }
    console.log(`Seeded ${field.key}: ${field.phases.length} phases.`);
  }
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
