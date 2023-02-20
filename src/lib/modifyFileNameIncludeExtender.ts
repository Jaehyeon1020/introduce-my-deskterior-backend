import * as fs from 'fs';

/** 파일 이름 확장자 포함으로 변경 */
export function modifyFileNameIncludeExtender(
  orginalFileName: string,
  ext: string,
) {
  const path = 'upload/' + orginalFileName;

  fs.renameSync(path, path + '.' + ext);
}
