// ------------------------------------------------------------
// Normalize email
// ------------------------------------------------------------

exports.normalizeEmail = function normalizeEmail(email) {
  if (!email) {
    return email;
  }

  email = email.trim().toLowerCase();

  if (
    email.endsWith("@gmail.com") ||
    email.endsWith("@googlemail.com")
  ) {
    const [local, domain] = email.split("@");

    email =
      local.replace(/\./g, "") +
      "@" +
      domain;
  }

  return email;
}