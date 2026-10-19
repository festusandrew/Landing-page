const assetPathPrefix = "/assets/recruitment-auth"

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
}

const largeAssets = {
  eyeOutline: "/assets/recruitment-auth-updated/f20cc.svg",
  eyePupil: "/assets/recruitment-auth-updated/c596c.svg",
  arrow: "/assets/recruitment-auth-updated/b0fae.svg",
  google: "/assets/recruitment-auth-updated/0aa14.svg",
  linkedin: "/assets/recruitment-auth-updated/7ea2f.svg",
  login: "/assets/recruitment-auth-updated/6f54d.svg",
  register: "/assets/recruitment-auth-updated/baff6.svg",
  candidate: "/assets/recruitment-auth-updated/b4b2c.svg",
  employer: "/assets/recruitment-auth-updated/a725d.svg",
  check: "/assets/recruitment-auth-updated/810f7.svg",
  close: "/assets/recruitment-auth-updated/13716.svg",
} as const

type RecruitmentAssetName = keyof typeof largeAssets

export function RecruitmentReferenceImage({
  name,
  className = "",
}: {
  name: RecruitmentAssetName
  className?: string
}) {
  const compact =
    name in recruitmentAssets
      ? recruitmentAssets[(name as keyof typeof recruitmentAssets)]
      : largeAssets[name]
  return (
    <picture className={`recruit-reference-picture ${className}`}>
      <source media="(min-width: 1440px)" srcSet={largeAssets[name]} />
      <img src={compact} alt="" />
    </picture>
  )
}

export function RecruitmentPasswordIcon() {
  return (
    <span className="recruit-reference-eye" aria-hidden="true">
      <RecruitmentReferenceImage
        name="eyeOutline"
        className="recruit-eye-outline"
      />
      <RecruitmentReferenceImage
        name="eyePupil"
        className="recruit-eye-pupil"
      />
    </span>
  )
}
