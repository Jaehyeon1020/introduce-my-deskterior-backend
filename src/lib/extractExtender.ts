/** file metadata의 mimetype에서 확장자 추출 */
export function extractExtender(mimetype: string): string {
  return mimetype.split('/')[1];
}
