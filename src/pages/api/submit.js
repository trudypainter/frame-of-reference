import { google } from "googleapis";

export default async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "path/to/your-service-account-key.json", // replace with path to your service account key file
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "your-spreadsheet-id"; // replace with your spreadsheet ID

    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1", // replace with your sheet name
      valueInputOption: "RAW",
      resource: {
        values: [
          // your row data
        ],
      },
    });

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
