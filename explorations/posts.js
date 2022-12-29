const posts = [
    {
        "author": "Lindsey Turner",
        "time_created": "2022/06/12 13:47",
        "time_edited": "2022/06/12 13:47",
        "title": "hdiiwmf ~ socializing in college",
        "text": "My first semester in college was nothing like anything before. I'm sure that is not uncommon. College for me was the first time I had to make an entirely new set of friends, away from my family connections, and by my choice without social media. Part of me enjoyed this clean slate, the other part feared I didn't know how to reconstruct myself. <br><br> I started college with the strategy of casting my net as wide as possible. I sat with new people every meal and class and met a lot of different people. However, where I gained breadth, I lacked depth. By week four, everyone had settled tightly into groups whereas I only had samples of random people. I tried going to more social events, but the events increasingly became a place to go <i>with</i> friends, not a place to go <i>make</i> friends. <br><br> By October, I felt pretty lonely and lost. I felt like I needed to accept I was a loner and blame it all on introversion. But instead of getting too much in my head, I decided to what some may call 'game-ify' my problem. <br><br> Using the p5.js library, I made a little webpage I could use to graph my weekly social interactions per person. It not only proved to myself I did in fact meet people regularly, but also incentivized me to leave my room. I called this 'How Do I Interact With My Friends' or 'hdiiwmf'. This simple program was a life changer. I actually only used it for five weeks before not needing it anymore. <br><br> Personally tracking my social life made me feel less alone. Even stranger, this very project helped me connect with someone who also used a social tracking system that made them feel less alone. I was reading an MIT blog and stumbled upon a similar story. Sometimes, you socialize by talking about figuring out how to socialize. <br> <img src='hdiiwmfMIT.jpg'/> <img src='hdiiwmfscreenshot.png' />"
    },
    {
        "author":"Lindsey Turner",
        "time_created":"2022/12/29",
        "time_edited":"2022/12/29",
        "title": "on comparison",
        "text":"** Very rough notes ** <br><br> Comparison exists in nature for optimization eg. most food, best habitat. Comparison is baked into human language eg. -er, -est. Comparison aids in decision making and comprehension of new things (Perhaps 'association' is better than 'comparison'. The first kind of comparision assumes a hierarchy, some optimal form, while the second kind assumes connection. Perhaps difference focused vs sameness focused). Comparison requires degrees of sameness and difference (global and local mutually influence, no total sameness and no total difference). Comparison is a way to evaluate the self, prove existance relative to others (Assumes desire to measure and quantify, requires a purpose or metric). Comparison becomes more poignant with proximity. Is the reason for comparison more important that the result itself? (We compare out of a need, what are we trying to optimize and why?). Our lives are too complex to possibly isolate factors (We may disillusion ourselves in understanding, then feel frustrated when results don't align). Focus instead: Needs, associations"
    },
    {
        "author":"Lindsey Turner",
        "time_created":"2022/12/29",
        "time_edited":"2022/12/29",
        "title": "praise and blame",
        "text":"I honor humility to a very high degree and for a couple years now have adopted the philosophy that praise and blame two ends of the same thing. Both attribute value, positive or negative, to a specific entity or group. I have also adopted the practice of disliking both. It may be more obvious why blame is no good, and this very philosophy is used in restorative justice. Blame neglects the circumstances which may lead people to act. It focuses on punishment and ownership. Blame disregards the interconnectedness of our existance, how no thing is solely one person's responsibility but rather the results of our collective individual actions and systems. Praise, I argue, should be treated the exact same. Praise of a person neglects the luck and circumstances which led a person to be successful. It ignores communities and collaboration. In summary, praise and blame cannot be owned because we are all responsible agents in a world with systemic biases and randomness. Everything and nothing is deserves blame and praise. How then do we proceed? I'm not quite sure, but stay grateful, humble, and accountable."
    },
    {
        "author":"Lindsey Turner",
        "time_created":"2022/12/29",
        "time_edited":"2022/12/29",
        "title": "what is wasted?",
        "text":"The idea of waste is confusing. It is so clear that things are wasted in our world: money, time, talent, food. But what does it mean for something to be wasted? Does nature ever waste? I think not, and thus I think waste relies on both expectation and inequality. We say things are wasted because they didn't meet our standard. We say things are wasted because some people lack what others have in excess. Nature doesn't waste because nature has no expectations and no sustained inequalities."
    },
    {
        "author":"Lindsey Turner",
        "time_created":"2022/06/12",
        "time_edited":"2022/06/12",
        "title": "",
        "text":""
    },
];


/** 
knowledge and love as actions
paper vs computer energy
There is way too much corn
*/

document.body.onload = function() {

    /** let back = document.getElementById("back");
    back.onclick = () => {
        window.close();
    } */

    let title = decodeURIComponent(window.location.search.slice(7));

    let post = posts.find((p) => p.title == title);

    document.getElementById("author").innerText = "Author: " + post.author;
    document.getElementById("time-created").innerText = "Time created: " + post.time_created;
    document.getElementById("time-edited").innerText = "Time edited: " + post.time_edited;
    document.getElementById("title").innerText = "Title: " + title;
    document.getElementById("text").innerHTML = post.text;

}
