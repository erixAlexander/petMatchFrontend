import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import useRegexValidation from "../../../../hooks/useRegexValidation";
import SignInButton from "./SignInButton";
import "./Signin.css";

const Signin = ({ openModal, setOpenModal }) => {
  const {
    email,
    setEmail,
    validEmail,
    password,
    setPassword,
    validPassword,
    confirmedPassword,
    setConfirmedPassword,
    validMatch,
    error,
    setError,
  } = useRegexValidation();

  if (openModal) {
    return (
      <div className="modal">
        <div className="close-modal-btn" onClick={() => setOpenModal(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <h1>{openModal === "signup" ? "Sign Up" : "Log In"}</h1>

        <div className="form">
          <div className="input-container">
            <label htmlFor="email">
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              autoComplete="off"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && !validEmail && (
              <p className="error">Please enter a valid email</p>
            )}
          </div>

          <div className="input-container">
            <label htmlFor="password">
              <FontAwesomeIcon
                icon={faCheck}
                className={validPassword ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPassword || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autoComplete="off"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && !validPassword && (
              <p className="error">
                Password must be at least 8 characters long and contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character
              </p>
            )}
          </div>

          {openModal === "signup" && (
            <div className="input-container">
              <label htmlFor="confirm">
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatch || !confirmedPassword ? "hide" : "invalid"
                  }
                />
              </label>
              <input
                type="password"
                name="confirm"
                id="confirm"
                placeholder="confirm password"
                autoComplete="off"
                required={true}
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
              {confirmedPassword && !validMatch && (
                <p className="error">Passwords do not match</p>
              )}
            </div>
          )}

          <div className="change-modal">
            <p
              onClick={() =>
                setOpenModal(openModal === "signup" ? "login" : "signup")
              }
            >
              {openModal === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
          </div>

          <SignInButton
            openModal={openModal}
            setError={setError}
            validEmail={validEmail}
            validMatch={validMatch}
            validPassword={validPassword}
            email={email}
            password={password}
          />
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }
};

export default Signin;
