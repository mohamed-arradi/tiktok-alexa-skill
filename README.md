# TikTok: Alexa Integration With TikTok

<p align="center">
  <img src="https://i.imgur.com/S5Pkncz.png" width="200"/>
</p>

## About

This is a skill for Amazon Alexa that allows you to Display any trending video that is available on TikTok [TikTok](https://www.tiktok.com/) just with your voice.

The process of setting up the skill is quite easy as the skill is not a complicate one.

As the trending API is only working with server side localisation, it means that this skill won't be able to be published to the Amazon Skill Store as the unofficial API from TikTok does not provide a way to pass geolocalisation data in order to have accurate local video. Hence why you can deploy in your AWS Region where you live in order to have trending video that are related to your place of living.

However, this skill is mainly here to demonstrate that video content can be reach via Alexa and that the fun can be shared just by voice ! 

### Installation

- 0 (yes I am a dev :)). Make sure before hand that your alexa account is the same one that the first step will require to create/login with
- 1 First of all, create or login to an account on Amazon Alexa Dev Centre [Amazon Alexa Dev Center](https://developer.amazon.com/alexa/console/ask)
- 2 Once you have done it, create a new Skill (you choose the name you want)
- 3 Add a calling name from the skill (I use TikTok Fan for myself)
- 4 Import the interaction model (interaction_model_en.json) in your intent creation or do it manually if you prefer with different wording
- 5 Then create a simple lambda function and add the ASK Kit as target
- 6 Create an S3 Bucket (or re-use you have) and upload the latest release Zip you can found on the release list [release](https://github.com/mohamed-arradi/Alexa-TikTok-Skill/releases)
- 7 Link the lambda function with this zip file. 
- 8 Now normally, your Alexa have the skill enabled as a Development Skill and you can use it at your own convenience 

### Supported Commands
Most everything you can do with a remote or keyboard is supported in the skill, and more:

- Play a random funny video on the trending list that TikTok Provides
- Read TikTok Video captions

### Alexa TikTok in Action - Demo (Click on the Image it redirect you to a Youtube Video)
<p>
  <a href="https://youtu.be/5z9Iirt9RnA">
    <img src="https://i.imgur.com/phPcfs2.jpeg" width="200">
  </a>
</p>

## Getting Help

If you need help getting a server going or configuring the Skill, please visit write me at hello@arradimohamed.fr. No need to raise a Github issue unless the issue is from the code.

## Credits (Images, etc)

<div>Alexa App inside TikTok Icon made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## Contributors

Please do any PR you can to improve or enhance the product and you will be named under this section with your github ID.

## Donate
[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/momolette)

## Developer Discussion
If you're interested in chatting with us about the development of the skill, please reach out to me at hello@arradimohamed.fr

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by TikTok
or any of its affiliates or subsidiaries. This is an independent and unofficial API. Use at your own risk.
