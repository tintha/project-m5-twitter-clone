import React, { useEffect } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("loading");
  const [currentUserAvatar, setCurrentUserAvatar] = React.useState(null);

  // Fetch the user data from the API (/me/profile)
  // When the data is received, update currentUser.
  // Also, set `status` to `idle`
  useEffect(() => {
    fetch("/api/me/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.profile.handle);
        setCurrentUserAvatar(data.profile.avatarSrc);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, status, currentUserAvatar }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
