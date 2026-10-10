const assetPathPrefix = '/assets/recruitment-auth';

export const recruitmentAssets = {
  logo: `${assetPathPrefix}/5d589.png`,
  eyeOutline: `${assetPathPrefix}/eda46.svg`,
  eyePupil: `${assetPathPrefix}/25997.svg`,
  arrow: `${assetPathPrefix}/a7a11.svg`,
  google: `${assetPathPrefix}/e7fe8.svg`,
  linkedin: `${assetPathPrefix}/c2258.svg`,
  login: `${assetPathPrefix}/20a37.svg`,
  register: `${assetPathPrefix}/46e96.svg`,
  candidate: `${assetPathPrefix}/496c4.svg`,
  employer: `${assetPathPrefix}/c0fbb.svg`,
  check: `${assetPathPrefix}/23bcc.svg`,
};

export function RecruitmentPasswordIcon() {
  return <span className="recruit-reference-eye" aria-hidden="true"><img src={recruitmentAssets.eyeOutline} alt="" /><img src={recruitmentAssets.eyePupil} alt="" /></span>;
}
