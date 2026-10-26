import { useRef, useState, type FormEvent } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { EyeOff, X } from "lucide-react"
import { Link } from "react-router"
import { Input } from "../app/components/ui/input"
import {
  RecruitmentPasswordIcon,
  RecruitmentReferenceImage,
  recruitmentAssets as assets,
} from "./RecruitmentReferenceAssets"
import { BrandLogo } from "./BrandLogo"
import "./recruitment-auth.css"

export type RecruitmentAuthMode = "login" | "register"

export function RecruitmentAuthScreen({
  mode,
  onMode,
  onClose,
  onUploadCV,
  onRequestTalent,
}: {
  mode: RecruitmentAuthMode
  onMode: (mode: RecruitmentAuthMode) => void
  onClose: () => void
  onUploadCV: () => void
  onRequestTalent: () => void
}) {
  const returnFocus = useRef(document.activeElement as HTMLElement | null)
  const register = mode === "register"
  const [recover, setRecover] = useState(false)
  const [role, setRole] = useState<"Candidate" | "Employer">("Candidate")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [status, setStatus] = useState("")
  const [prepared, setPrepared] = useState(false)
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    company: "",
    region: "Ireland",
    remember: false,
    terms: false,
  })
  function changeMode(next: RecruitmentAuthMode) {
    setRecover(false)
    setStatus("")
    setPrepared(false)
    setShowPassword(false)
    setShowConfirm(false)
    setValues({ ...values, password: "", confirm: "" })
    onMode(next)
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (register) {
      if (values.password !== values.confirm) {
        setStatus("Your passwords do not match. Please try again.")
        return
      }
      setPrepared(true)
      setValues({ ...values, password: "", confirm: "" })
      setStatus(
        "Thank you. Your account details are complete.",
      )
    } else {
      setStatus(
        recover
          ? "Password recovery is temporarily unavailable. Please try again later."
          : "Sign-in is temporarily unavailable. Please try again later.",
      )
    }
  }
  const benefits = register
    ? [
        "Apply to jobs with one click using your saved profile",
        "Track your application status in real time",
        "Save vacancies and get notified of new matches",
        "Access salary guides and market reports",
      ]
    : [
        "Track all your applications in one dashboard",
        "Save vacancies and get alerts for new matches",
        "One-click apply with your saved profile",
      ]
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="recruit-auth-overlay" />
        <Dialog.Content
          className="recruit-auth"
          data-register={register}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            if (returnFocus.current?.isConnected) returnFocus.current.focus()
          }}
        >
          <Dialog.Close
            className="recruit-auth-close"
            aria-label="Back to recruitment"
          >
            <RecruitmentReferenceImage name="close" />
          </Dialog.Close>
          <main className="recruit-auth-form-panel">
            <div className="recruit-auth-form-wrap">
              <button
                type="button"
                onClick={onClose}
                className="recruit-auth-logo"
                aria-label="Back to recruitment"
              >
                <BrandLogo />
              </button>
              <Dialog.Title className="recruit-auth-title">
                {register
                  ? "Create your account"
                  : recover
                    ? "Reset your password"
                    : "Welcome back"}
              </Dialog.Title>
              <Dialog.Description className="recruit-auth-description">
                {register
                  ? "Join MployUs to access vacancies, track applications, and connect with employers across Ireland and the UK."
                  : recover
                    ? "Enter your email address to request a password reset link."
                    : "Sign in to your MployUs account to manage applications and saved vacancies."}
              </Dialog.Description>
              {prepared ? (
                <div className="recruit-auth-prepared">
                  <div className="recruit-auth-feature-icon">
                    <RecruitmentReferenceImage name="register" />
                  </div>
                  <h2>Your account details are ready.</h2>
                  <p>
                    {values.firstName} {values.lastName}
                    <br />
                    {values.email}
                    <br />
                    {role} · {values.region}
                  </p>
                  <p role="status">{status}</p>
                  <button
                    type="button"
                    className="recruit-auth-primary"
                    onClick={
                      role === "Candidate" ? onUploadCV : onRequestTalent
                    }
                  >
                    {role === "Candidate"
                      ? "Prepare your CV profile"
                      : "Prepare a talent request"}
                    <RecruitmentReferenceImage name="arrow" />
                  </button>
                  <button
                    type="button"
                    className="recruit-auth-text-button"
                    onClick={() => {
                      setPrepared(false)
                      setStatus("")
                    }}
                  >
                    Edit account details
                  </button>
                </div>
              ) : (
                <>
                  <form className="recruit-auth-form" onSubmit={submit}>
                    {register && (
                      <fieldset className="recruit-auth-role">
                        <legend>I am a</legend>
                        <div>
                          {(["Candidate", "Employer"] as const).map(
                            (option) => (
                              <button
                                key={option}
                                type="button"
                                aria-pressed={role === option}
                                onClick={() => setRole(option)}
                              >
                                <RecruitmentReferenceImage
                                  name={
                                    option === "Candidate"
                                      ? "candidate"
                                      : "employer"
                                  }
                                />
                                {option}
                              </button>
                            ),
                          )}
                        </div>
                      </fieldset>
                    )}
                    {register && (
                      <div className="recruit-auth-name-grid">
                        <label>
                          First Name
                          <Input
                            required
                            autoComplete="given-name"
                            value={values.firstName}
                            onChange={(event) =>
                              setValues({
                                ...values,
                                firstName: event.target.value,
                              })
                            }
                            placeholder="Aoife"
                          />
                        </label>
                        <label>
                          Last Name
                          <Input
                            required
                            autoComplete="family-name"
                            value={values.lastName}
                            onChange={(event) =>
                              setValues({
                                ...values,
                                lastName: event.target.value,
                              })
                            }
                            placeholder="Murphy"
                          />
                        </label>
                      </div>
                    )}
                    {register && role === "Employer" && (
                      <label>
                        Company Name
                        <Input
                          required
                          autoComplete="organization"
                          value={values.company}
                          onChange={(event) =>
                            setValues({
                              ...values,
                              company: event.target.value,
                            })
                          }
                          placeholder="Your organisation"
                        />
                      </label>
                    )}
                    <label>
                      Email Address
                      <Input
                        required
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) =>
                          setValues({ ...values, email: event.target.value })
                        }
                        placeholder="aoife.murphy@email.com"
                      />
                    </label>
                    {register && (
                      <label>
                        Account Region
                        <select
                          value={values.region}
                          onChange={(event) =>
                            setValues({ ...values, region: event.target.value })
                          }
                        >
                          {[
                            "Ireland",
                            "Northern Ireland",
                            "England",
                            "Wales",
                            "Scotland",
                          ].map((region) => (
                            <option key={region}>{region}</option>
                          ))}
                        </select>
                      </label>
                    )}
                    {!recover && (
                      <>
                        <div className="recruit-auth-password-field">
                          <div className="recruit-auth-label-row">
                            <label htmlFor="recruit-auth-password">
                              Password
                            </label>
                            {!register && (
                              <button
                                type="button"
                                onClick={() => {
                                  setRecover(true)
                                  setStatus("")
                                }}
                              >
                                Forgot password?
                              </button>
                            )}
                          </div>
                          <div className="recruit-auth-password">
                            <Input
                              id="recruit-auth-password"
                              required
                              minLength={register ? 8 : undefined}
                              type={showPassword ? "text" : "password"}
                              autoComplete={
                                register ? "new-password" : "current-password"
                              }
                              value={values.password}
                              onChange={(event) =>
                                setValues({
                                  ...values,
                                  password: event.target.value,
                                })
                              }
                              placeholder={
                                register
                                  ? "Min. 8 characters"
                                  : "Enter your password"
                              }
                            />
                            <button
                              type="button"
                              aria-label={
                                showPassword ? "Hide password" : "Show password"
                              }
                              aria-pressed={showPassword}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <RecruitmentPasswordIcon />
                              )}
                            </button>
                          </div>
                        </div>
                        {register ? (
                          <>
                            <label>
                              Confirm Password
                              <div className="recruit-auth-password">
                                <Input
                                  required
                                  minLength={8}
                                  type={showConfirm ? "text" : "password"}
                                  autoComplete="new-password"
                                  value={values.confirm}
                                  onChange={(event) =>
                                    setValues({
                                      ...values,
                                      confirm: event.target.value,
                                    })
                                  }
                                  placeholder="Re-enter your password"
                                  aria-invalid={Boolean(
                                    status &&
                                      values.password !== values.confirm,
                                  )}
                                />
                                <button
                                  type="button"
                                  aria-label={
                                    showConfirm
                                      ? "Hide confirmed password"
                                      : "Show confirmed password"
                                  }
                                  aria-pressed={showConfirm}
                                  onClick={() => setShowConfirm(!showConfirm)}
                                >
                                  {showConfirm ? (
                                    <EyeOff size={16} />
                                  ) : (
                                    <RecruitmentPasswordIcon />
                                  )}
                                </button>
                              </div>
                            </label>
                            <label className="recruit-auth-checkbox recruit-auth-terms">
                              <input
                                required
                                type="checkbox"
                                checked={values.terms}
                                onChange={(event) =>
                                  setValues({
                                    ...values,
                                    terms: event.target.checked,
                                  })
                                }
                              />
                              <span>
                                I agree to MployUs'{" "}
                                <Link
                                  to="/policies/terms"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                  to="/policies/privacy"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Privacy Policy
                                </Link>
                                <small>
                                  My data will be processed in accordance with
                                  GDPR (EU 2016/679) and the Data Protection Act
                                  2018.
                                </small>
                              </span>
                            </label>
                          </>
                        ) : (
                          <label className="recruit-auth-checkbox">
                            <input
                              type="checkbox"
                              checked={values.remember}
                              onChange={(event) =>
                                setValues({
                                  ...values,
                                  remember: event.target.checked,
                                })
                              }
                            />
                            <span>Keep me signed in</span>
                          </label>
                        )}
                      </>
                    )}
                    <button type="submit" className="recruit-auth-primary">
                      {register
                        ? "Create Account"
                        : recover
                          ? "Request reset link"
                          : "Sign In"}
                      <RecruitmentReferenceImage name="arrow" />
                    </button>
                    {status && (
                      <p className="recruit-auth-status" role="status">
                        {status}
                      </p>
                    )}
                  </form>
                  {recover ? (
                    <button
                      type="button"
                      className="recruit-auth-text-button"
                      onClick={() => {
                        setRecover(false)
                        setStatus("")
                      }}
                    >
                      Back to sign in
                    </button>
                  ) : (
                    <>
                      <div className="recruit-auth-divider">
                        <span />
                        or
                        <span />
                      </div>
                      <div className="recruit-auth-social">
                        {(["Google", "LinkedIn"] as const).map((provider) => (
                          <button
                            key={provider}
                            type="button"
                            onClick={() =>
                              setStatus(
                                `${provider} sign-in is temporarily unavailable. Please try again later.`,
                              )
                            }
                          >
                            <RecruitmentReferenceImage
                              name={
                                provider === "Google" ? "google" : "linkedin"
                              }
                            />
                            {register ? "Sign up" : "Continue"} with {provider}
                          </button>
                        ))}
                      </div>
                      <p className="recruit-auth-switch">
                        {register
                          ? "Already have an account? "
                          : "Don't have an account? "}
                        <button
                          type="button"
                          onClick={() =>
                            changeMode(register ? "login" : "register")
                          }
                        >
                          {register ? "Sign in" : "Create one"}
                        </button>
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          </main>
          <aside className="recruit-auth-benefits">
            <div className="recruit-auth-benefits-wrap">
              <div className="recruit-auth-feature-icon">
                <RecruitmentReferenceImage
                  name={register ? "register" : "login"}
                />
              </div>
              <h2>
                {register ? (
                  <>
                    Start your
                    <br />
                    journey today.
                  </>
                ) : (
                  <>
                    Your career,
                    <br />
                    simplified.
                  </>
                )}
              </h2>
              <p>
                {register
                  ? "Create a free account and get instant access to hundreds of vacancies across Healthcare, Logistics, Hospitality, and Education."
                  : "Track applications, save vacancies, and get matched with roles across Ireland and the UK — all from one place."}
              </p>
              <ul>
                {benefits.map((benefit) => (
                  <li key={benefit}>
                    <span>
                      <RecruitmentReferenceImage name="check" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              {register ? (
                <div className="recruit-auth-stats">
                  {[
                    ["1,200+", "Active vacancies"],
                    ["98%", "Placement rate"],
                    ["4.8/5", "Candidate rating"],
                  ].map(([number, label]) => (
                    <div key={label}>
                      <strong>{number}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <blockquote>
                  <p>
                    "MployUs made my job search so much easier. I found my
                    current role within two weeks of signing up."
                  </p>
                  <cite>— Sarah O'Brien, Dublin</cite>
                </blockquote>
              )}
            </div>
          </aside>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
