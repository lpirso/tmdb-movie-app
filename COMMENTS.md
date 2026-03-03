Hi!

I didn't focus on a specific part. I started from the hardest part and ended with the easiest.
Had a few issues when setting things up. VS Code was using the wrong version of typescript, so I had all these weird errors
and that took some time to figure out. Then I had to set up a vite proxy which I hadn't done before.

The only experience with NestJS I had prior was that I had read the documentation before the second interview, so to get the first
initial request I did use ChatGPT a lot. After that I thought about the backend architecture a bit, what I wanted to do.
Then I put the endoints up, tested that they work. I didn't want to ask for genres and languages every request, so I installed
the CacheModule. I thought I was done before that but then I wanted the languages to be in normal English, then I understood
that asking them every time is a bad idea and that the same was true for genres. So my "yay I'm done" moment was delayed for
another hour or two. But then finally I was mostly done with backend.

Frontend went smoothly. The only new thing was styled-components and it could well be that I have used them wrong in places.
I started with components and their functionality, then added the "LIFO" persistence. Then wrote the css. I can write css
in my sleep, so I was confident that however tired I am, I can still do that competently. I'm sure there are perhaps some
UI bugs. Making it responsive was also really easy, especially since there are many styles that do that for you.

And then came the deployment and adding env variables. That's where I struggled. I am kind of ashamed about that part. This is
the part, where I scrambled the code together from ChatGPT snippets and it works. Though I am pretty sure the solution is not
good. I had a CORS error in the end and I could not figure out what was going on for a long time. This is also the only time I
did squash a few commits, since well the commit messages were something like "helpppp". In the end it turned out that I had
added an environment variable with / in the end.

Regarding the usage of AI, I used ChatGPT as "google" but I avoided copy pasting code from there. However, the commit messages
are mostly written by ChatGPT, so is the README. So I am specifically writing this here as I am.

At 10k requests per second, I assume the first bottleneck would be the TMDB API calls. It would probably block so many requests.
The first solution would be to cache the popular queries.

Now I am here. I will review everything one more time and then I will submit this test assignment. I hope the reviewers will
have at least some fun with it.