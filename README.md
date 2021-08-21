# Perspective API / Tesseract Discord Bot
Machine-Learning, OCR Discord Filter Bot powered by Google's Perspective API and tesseract.js.

This is a **Complete Project**. This means you have node-modules pre-included. If you're a complete beginner, there will be instructions
as to how to set this up. If you aren't, you *should* know what you have to change to make this bot power up (If not, keep reading).

**REGARDLESS TO YOUR SKILL, PLEASE READ STEP 3. THIS IS IMPORTANT TO SET UP THE API PROPERLY (TRUST ME, ITS VERY DIFFICULT TO FIGURE OUT IF YOU DON'T HAVE INSTRUCTIONS.)**
**IF YOU DON'T ALREADY HAVE TESSERACT SET UP, READ STEP 4.**

**HEAD TO https://developers.perspectiveapi.com/s/about-the-api-faqs FOR QUESTIONS ABOUT PERSPECTIVE OR GO TO https://www.npmjs.com/package/node-tesseract-ocr FOR INFORMATION ABOUT THE TESSERACT NODE PACKAGE. YOU CAN CONTACT `Jayleaf#1234` ON DISCORD FOR QUESTIONS ABOUT THE BOT.**

**STEP 1** 
--
*Create a Discord Bot. Skip this step if you already have one.*

- Head to https://discord.com/developers/applications.
- Click the "New Application" button in the top right.
- The name can be whatever you want. Team does not matter.
- You can set a profile picture and name if you want.
- On the left side panel, you can see the "Bot" tab. Click it.
- Click the "Add Bot" button.
- Click "Copy" next to your bot's profile picture to copy down your token.
- Move to Step 2.

**STEP 2**
--
*Give your token to the code.*

- Download this repository as a ZIP.
- Go into the index.js file.
- Scroll to the bottom, where you will see `client.login`.
- Replace the string in `client.login` with your bot token.
- Move to Step 3.1.


**STEP 3.1**
--
*Get your API key.*

- Navigate to https://console.cloud.google.com/
- Open the hamburger menu in the top left corner
- Hover over "APIs and Services", then click on Dashboard.
- On the side menu, click "Credentials".
- At the top, click "Create Credentials".
- In that menu, click "API key".
- Copy the key that comes up.
- Navigate back to your index.js, and head down to line 64. Replace YOURAPIKEYHERE with your api key.
- Save your changes.

**STEP 3.2**
--
*Activate the API.*

- Navigate to https://developers.perspectiveapi.com/s/docs-get-started
- Scroll to the bottom of the page.
- Click the "Request API Access" Button.
- This will take you to a google form. Fill it out honestly, and then submit it.
- In a few minutes to an hour or so you will receive an email in your inbox that you have been granted access to the API.
- When you receive that email, either click the button or follow this link: https://console.developers.google.com/apis/library/commentanalyzer.googleapis.com
- Enable the API.

**That should be all you need for the Perspective API filter. Now, we will move on to setting up Tesseract.**

**STEP 4**
--
*Install Tesseract*

- Navigate to https://github.com/UB-Mannheim/tesseract/wiki
- Install the 64-bit version of Tesseract (Assuming you have a 64-bit OS.)
- After you install Tesseract, you will need to add it to your PATH.
*These are Windows instructions. If you are not running windows, do what you need to to install Tesseract and add it to your PATH.*
- Head to Settings.
- Click on "System".
- Click on "About" in the side bar.
- On the right-hand side, click "Advanced System Settings".
- A new window will pop up. At the bottom of this window, click "Environment Variables".
- Look in the System Variables menu, and scroll until you find a variable named "PATH", "Path", or "path".
- Click "Edit".
- Unselect your current selection (so that nothing is highlighted in blue), then click "New"
- Then, Click "Browse".
- Navigate to the directory in which you installed Tesseract.
- Select the folder named "Tesseract-OCR".
- Click Enter, then click OK at the bottom of the window to exit the menu.
- Restart VSC or your command prompt.


**That should be all you need to do to get the bot up and running. Move to Step 5 for optional steps.**


**OPTIONAL**
--

**STEP 5**
--
*Configure your hard filter*

- Navigate into the index.js file.
- Go down to Line 37.
- Read the green comments on the right side. It will explain the hard filter, but I will also nutshell it here.
- Words in the Hard Filter will **ALWAYS** delete a message that contains any of the words, regardless of API results.
- Add whatever words you want in this array, making sure to follow the pre-existing example layout.


**STEP 5.1**
--
*Configure your API attributes*

- Navigate into the index.js file.
- Go down to Line 32.
- Read the green comments above the constant. This explains the attributes.
- To add more attributes, simply follow the pre-existing format and choose from the available options (Options disclosed in the green comment)
- Make sure your key (the string) is whatever attribute you want, and make sure your value (the number to the right of the key) is whatever minimum api result that you want to trip your filter.
- Head down to line 86.
- Following the same format as the pre-existing array elements, add whatever new attributes you added in the attributeThresholds constant into this array.
- Head down to line 102.
- This is where you'll have to work your own magic. This has been pre-set up for 2 and primarily used for testing, but be creative. **PLEASE READ THE COMMENTS AT LINE 29 AND 30 FOR IDEAS ON HOW TO DO THIS IF YOU CAN'T DO IT YOURSELF.** This will only send a message. Here, you can choose what to do. The If statement at line 102 will check if there is one or more attributes that passed your threshold. Within this if statement is where you would put `message.delete()`, or whatever else you want to do when your filter trips. **DO NOT TOUCH LINE 110.** On Line 111, you can choose what happens to your user if they say a word that's hard-filtered.

**Step 5.2**
--
*Repeat your edits.*

- **Anything you did in Step 5.1 to the filter (i.e editing your scoreArray) you will have to do to the Tesseract code. Scroll to line 137 for that.**



**FOOTNOTES**
--

I tried my best to explain this. If you have issues, contact me on discord at Jayleaf#1234, or if you don't understand this guide, i recommend learning basic js (as you would be a complete beginner)>
