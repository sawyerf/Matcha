export const scoreMatch = (me, matchs) => {
    console.log(me);
    for (const match of matchs) {
        match.score = 0;
        match.score += 10 - Math.abs(me.age - match.age);
        if (me.tags != null && match.tags != null) {
            const tags = match.tags.split(',');
            const myTags = me.tags.split(',');
            for (const myTag of myTags) {
                if (tags.indexOf(myTag) >= 0) {
                    // console.log('tags: ', myTag)
                    match.score += 2;
                }
            }
        }
        match.score += 10 - Math.abs(match.popularity - me.popularity) / 10;
    }
}