import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { client_email, private_key } = JSON.parse(
        process.env.GOOGLE_SERVICE_ACCOUNT
      );
      const doc = new google.auth.JWT({
        email: client_email,
        key: private_key,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const sheets = google.sheets({ version: "v4", auth: doc });

      const { data } = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1", // update this with your sheet name
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values: [
            // your values here
          ],
        },
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Error writing to Google Sheet" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
