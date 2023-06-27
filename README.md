# Hack-Week-Web-Reviews

This tool is used to generate feedback summaries and potential action items based on user feedback. It retrieves user feedback from Mailosaur, analyzes it using the Lucius API, and sends a Slack message with the generated summary.

## Prerequisites

Before using this tool, ensure that you have the following prerequisites set up:

- Node.js installed on your system.
- An account with [Mailosaur](https://www.mailosaur.com/) and the API key.
- An account with [Lucius API](https://lucius.ai/) and the API key.
- Access to a Slack workspace and a webhook URL for sending messages.

## Installation

1. Clone the repository or download the code files to your local machine.

2. Install the dependencies by running the following command:

   ```shell
   npm install
   ```

3. Create a `.env` file in the project directory and provide the necessary environment variables. The required environment variables are as follows:

   - `MAILOSAUR_API_KEY`: Your Mailosaur API key.
   - `MAILOSAUR_SERVER`: The Mailosaur server ID.
   - `MAILOSAUR_EMAIL`: The email address to filter for feedback messages.
   - `LUCIUS_API_KEY`: Your Lucius API key.
   - `LUCIUS_ENDPOINT`: The Lucius API endpoint URL.
   - `MAX_TOKENS`: The maximum number of tokens to generate in the Lucius API call.
   - `SLACK_URL`: The Slack webhook URL for sending the message.
   - `INITIAL_PROMPT`: The initial prompt for the Lucius API.

## Usage

To generate feedback summaries and action items, follow these steps:

1. Make sure you have set up the environment variables as described in the "Installation" section.

2. Open a command prompt or terminal in the project directory.

3. Run the following command to execute the tool:

   ```shell
   npm start
   ```

   The tool will fetch the user feedback from Mailosaur, analyze it using the Lucius API, and send a Slack message with the generated summary.

## Customization

Feel free to customize the tool according to your specific needs. You can modify the following aspects:

- Adjust the Mailosaur criteria to filter emails based on your desired conditions.
- Customize the Lucius API prompt and maximum token count.
- Modify the Slack message format or send the generated summary to another platform.

## Limitations

Please note the following limitations:

- The tool retrieves feedback messages from Mailosaur and analyzes them using the Lucius API. Make sure you have configured Mailosaur correctly and have valid feedback emails in your server.
- The Lucius API generates summaries and potential action items based on the provided user feedback. The accuracy and quality of the generated content depend on the Lucius API's capabilities and the data provided.
- This tool serves as a starting point and may require additional customization or enhancements based on your specific requirements.

## Support

For any issues or questions related to this tool, please reach out to the tool's maintainer or refer to the documentation provided by Mailosaur, Lucius API, and Slack for respective platforms.

## License

This tool is provided under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute it as needed.
