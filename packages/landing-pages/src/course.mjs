const text = { type: 'string' };
const object = properties => ({ type: 'object', properties, required: Object.keys(properties), additionalProperties: false });
const list = items => ({ type: 'array', items });
export const courseSchema = object({
  title: text, eyebrow: text, headline: list(text), introduction: text,
  overview: text, benefits: list(object({ title: text, description: text, label: text })),
  journey: text, modules: list(object({ label: text, title: text, description: text, topics: list(text), practice: text })),
  audience: list(object({ title: text, description: text })),
  faq: list(object({ question: text, answer: text })), closing: text
});
export const generationSchema = object({
  status: { type: 'string', enum: ['ready', 'needs_information'] },
  questions: list(text),
  course: { anyOf: [courseSchema, { type: 'null' }] }
});

function validate(value, schema, path = 'response') {
  if (schema.anyOf) {
    for (const option of schema.anyOf) { try { validate(value, option, path); return; } catch {} }
    throw new Error(`Invalid ${path}`);
  }
  if (schema.type === 'null') { if (value !== null) throw new Error(`Invalid ${path}`); return; }
  if (schema.type === 'string') {
    if (typeof value !== 'string' || !value.trim() || value.length > 2000 || /[\u0000-\u0008]/u.test(value)) throw new Error(`Invalid ${path}`);
    if (schema.enum && !schema.enum.includes(value)) throw new Error(`Invalid ${path}`);
    return;
  }
  if (schema.type === 'array') {
    if (!Array.isArray(value) || value.length > 12) throw new Error(`Invalid ${path}`);
    value.forEach((item, index) => validate(item, schema.items, `${path}[${index}]`)); return;
  }
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid ${path}`);
  if (Object.keys(value).some(key => !Object.hasOwn(schema.properties, key))) throw new Error(`Unexpected field in ${path}`);
  for (const [key, child] of Object.entries(schema.properties)) validate(value[key], child, `${path}.${key}`);
}

export function validateCourse(course) {
  validate(course, courseSchema, 'course');
  if (course.title.length > 100 || course.eyebrow.length > 80) throw new Error('Course title or eyebrow is too long');
  if (course.headline.length < 2 || course.headline.length > 3 || course.headline.some(line => line.length > 32)) throw new Error('Headline must have 2–3 short lines');
  if (course.benefits.length !== 3 || course.audience.length !== 3) throw new Error('Three benefits and audience groups are required');
  if (!course.modules.length || course.modules.length > 8 || course.modules.some(m => !m.topics.length || m.topics.length > 6)) throw new Error('Invalid curriculum');
  if (course.faq.length < 2 || course.faq.length > 6) throw new Error('Invalid FAQ');
  return course;
}

export function validateGeneration(result) {
  validate(result, generationSchema);
  if (result.status === 'ready') {
    if (result.questions.length || result.course === null) throw new Error('Ready response must contain a course and no questions');
    validateCourse(result.course);
  } else if (result.course !== null || !result.questions.length || result.questions.length > 3) {
    throw new Error('Clarification must contain 1–3 questions and no course');
  }
  return result;
}
