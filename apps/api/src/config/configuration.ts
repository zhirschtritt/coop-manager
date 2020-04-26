function parseStaffEmails(emailString = ''): string[] {
  return emailString.split(',').map(s => s.trim());
}

export function config() {
  return {
    members: {
      staffEmails: parseStaffEmails(process.env.STAFF_EMAILS),
    },
    port: process.env.PORT || 3333,
  };
}

