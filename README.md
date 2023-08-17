Wistia Full Stack Developer Challenge

# Overview
Enhance an existing lightweight video application with the Wistia API.

# Background
Wistia is a video hosting solution for marketers. We make it easy to upload, manage, share, and track your web video performance. The [Wistia Developer API](https://wistia.com/support/developers) gives you all kinds of programmatic access to your Wistia account and its videos.

# System Description
The video application is made of two views: a landing page to watch videos and an owner dashboard to manage them. To get you coding right away, you'll be provided with a starter kit that includes the frontend and a READ-ONLY API token. The API token is connected to a Wistia account already populated with enough videos to complete the challenge. Think of it as an evolving [MVP](https://medium.freecodecamp.org/what-the-hell-does-minimum-viable-product-actually-mean-anyway-7d8f6a110f38), which you are enhancing.

# Installation
## Step 1: Serve `./client` from a local web server

Any method works. We suggest http-server because it's simple.
```sh
npm install http-server -g
cd /client
http-server
```

## Step 2a. Open localhost:8080/playlist.html
![](./wireframes/playlist_initial.png)

## Step 2b. Open localhost:8080/dashboard.html
![](./wireframes/dashboard.png)


# Submission Checklist
**Please reach out if you need anything clarified or if you have any questions!**

- [ ] Submission meets all sections of Feature Specifications
- [ ] Code is tested in one browser of your choice
- [ ] The frontend is accomplished with plain javascript, HTML, and CSS.
- [ ] The backend is accomplished in Ruby, Ruby on Rails, Python, Elixir, or Node
  * If you'd like to use a language that's not listed, give us a shout and we'll work with you to find a language that you know and we can evaluate.
- [ ] Includes a README telling us:
  * the browser and OS used
  * a brief architecture overview of your design
  * an explanation of the solution's performance characteristics
  * anything you learned or would do differently if doing this again
  * any other notes you think are relevant

# Feature Specifications
## Implement autoplay for playlist
Evolve the landing page to autoplay videos as designed.

- [ ] A 5-second countdown appears between videos
- [ ] While the video is playing, the video shows as "playing" in the queue
- [ ] Autoplay is disabled after all videos have played once
- [ ] Videos for autoplay are grabbed from queue's top, played videos are added to the bottom

![](./wireframes/playlist_next.png)

## Implement hide and show videos for the owner dashboard
- [ ] Create an endpoint to manage the video's visibility
- [ ] Wire the endpoint to the eye toggle (strikethrough icon represents hidden)
- [ ] Update the playlist landing page to only render videos marked as visible

## Design the database for "search by tag" for the owner dashboard
*No code implementation is necessary for this part of the assignment. A written explanation is sufficient.*

Imagine a tech lead asks you to design the database for a "search by tag" feature. Users should be allowed to tag videos and find videos matching that tag.

Here's a sample `videos` schema to get you started:

```
videos
- id
- description
- created_at
- play_count
...other stuff
```

Please use SQL for your solution as opposed to an ORM.

- [ ] Write a query to print the total number of videos with at least 1 play count
- [ ] Create the schema(s) to support tags
- [ ] Write a query to find the video with the most number of tags. If more than one video have the same number of tags, print the one created most recently.

# What is the purpose of this exercise?
The goal is to have an interesting discussion about:
  * API practices
  * Modeling databases and queries
  * HTML, CSS and Javascript practices
  * Server side language of choice
  * MVC architectures

We want to know what kinds of engineering paradigms you'd bring to Wistia. We encourage you to use this exercise to showcase what you care about as a developer. If you find yourself taking a "shortcut" to get some functionality, that's okay. We care more that you can discuss the trade-offs of taking an approach that might not be "production-quality".

As your app evolves, feel free to change the app routes, folder structure and starter code as you see fit. (For example, if you choose Elixir for your backend, you may choose to pull the starter code into your Phoenix app's templates and static folder.)

We haven't provided pixel specification so don't worry about pixel-perfection.

# Starting Point
Here's some links to our docs to help you get started. Any documented piece of the API you find on your own is also fair game in the submitted solution.

Leverage these as much, or as little, as it makes sense to you.

* Javascript Player API methods
  * [play](https://wistia.com/support/developers/player-api#play)
  * [end](https://wistia.com/support/developers/player-api#end)
  * [replaceWith](https://wistia.com/support/developers/player-api#replacewith-hashedid-options)
  * [silent autoplay](https://wistia.com/support/developers/embed-options#silentautoplay)
* [Getting started with Wistia's Data API](https://wistia.com/support/developers/data-api)
* [View video stats](https://wistia.com/support/developers/stats-api)

# Feedback (Optional)
Help us improve our process by filling out the following anonymous survey: https://wistia-survey.typeform.com/to/kThyIu

---

Icons powered by [Font Awesome](https://fontawesome.com/)
