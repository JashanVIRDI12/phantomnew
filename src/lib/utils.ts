/** Lightweight className combiner (shadcn `cn` convention). */
export function cn(
  ...inputs: Array<string | number | false | null | undefined>
): string {
  return inputs.filter(Boolean).join(" ");
}
