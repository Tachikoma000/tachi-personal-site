// Reference copy for handoff documentation (not compiled; live source lives at the project root).
import React from "react";
import { TopBar } from "../../components/navigation/TopBar.ref.jsx";
import { SectionHeading } from "../../components/writing/SectionHeading.ref.jsx";
import { PieceEntry } from "../../components/writing/PieceEntry.ref.jsx";
import { Poem } from "../../components/writing/Poem.ref.jsx";
const POEMS = [{
  id: "jollof-fried-rice",
  title: "If i get jollof and you get fried rice,",
  sub: "(a story for my brothers, Evan, Jonathan, Joel, Joshua)",
  excerpt: "Come, sit. The floor is cool. Concrete keeps its secrets from the sun, and a boy who lies belly-down on bare cement…",
  meta: <React.Fragment>{"poem \u00b7 2026 \u00b7 "}<strong style={{ fontWeight: 500 }}>by tachi</strong></React.Fragment>,
  illustration: "moon-crescent",
  tailpiece: "moon-crescent",
  stanzas: [
    ["Come, sit. The floor is cool.","Concrete keeps its secrets from the sun,","and a boy who lies belly-down on bare cement","in the furnace of a Lagos afternoon","knows a luxury no palace has learned."],
    ["The road outside was never finished.","The agama lizards nodded on the wall","like elders agreeing with the sun.","The world, as far as we knew, was our mother's garden","at the front and the back, plantain leaning into banana,","papaya standing guard, soursop and mango","dropping their sweetness like careless kings,","and five boys in the middle of it all,","barefoot lords of a green kingdom."],
    ["We tied our mother's fabric at our necks","and became more than boys.","A wrapper is a cape if the wind agrees,","and the wind always agreed.","We flew low over the compound,","saving a world that did not know it was in danger,","dying dramatic deaths in the red dust","and rising again for supper."],
    ["We hid and we sought.","Behind the water drum, inside the storehouse","where old radios slept among the things","nobody had the courage to throw away,","and Evan and i would open their bodies with our small hands,","priests of the screwdriver,","asking every dead machine the same question.","What made you sing?"],
    ["And when father said the word, restaurant,","the whole house changed its weather.","A trip down that unfinished road was a pilgrimage,","and the negotiations began before the door closed behind us.","What will you take when we get there?","Jollof rice. No, fried rice.","No, sausage roll and a bottle of Fanta, cold, with the mist on it.","And then the treaty, solemn as anything signed by nations.","If i get jollof and you get fried rice,","we will share.","Half of mine for half of yours.","This is how brothers first learn economics.","This is how brothers first learn communion."],
    ["At night, when NEPA took the light,","as NEPA always took the light,","we lit the green coil and surrendered the house to its smoke,","and waited outside under the moon,","the whole family loose in the dark,","aunts and uncles and boys and stories.","We sang songs of praise until God leaned closer.","We sang songs that made us laugh until we fell over.","We sang songs that made the older ones quiet","in a way we did not yet understand.","Mosquitoes took their small tax from our legs","and we paid it gladly.","The moon was our ceiling.","We were never once poor under it."],
    ["And there was fire, once.","The generator, the funnel, the slipped hand,","the night the back of the house wore flames,","and father shouting for water, for soap, for sand,","ordinary things turned to weapons,","and i, searching the smoke for my brother,","crying out the words for the very first time,","i love you, please come back.","And Evan's voice returning like an answered prayer.","He had run toward the street, toward help,","already a healer before he knew the word for it.","Understand this. Even our disasters","taught us how to love."],
    ["Evan, who drew the chambers of the heart as a child","and now mends them as a man.","Jonathan, who arrived speaking a language","none of us could enter,","who carried more color in his skin and his spirit","than our technical house knew how to praise,","and forgive us, brother, that we learned your worth slowly,","you were the song in a family of engineers,","and the song is what everyone remembers in the end.","Joel, who came as the beloved baby","and grew into a deep quiet river,","watching everything, wasting no words,","banking his wisdom like treasure.","And Joshua, the last, the gathering of all of us,","builder's hands, artist's eye, athlete's stride,","charm enough to soften any room,","proof that our parents saved","a full measure of every gift","for the final child."],
    ["We were boys who did not know what the world was,","or what it would ask of us,","or that oceans and years were already waiting","to scatter us like seed."],
    ["We only knew the cool of the floor,","the sweetness of stolen mangoes,","the weight of a fabric cape,","and the certain, unshakeable knowing","that we were covered,","under mother's wing, under father's roof,","under God's wide sky."],
    ["Brothers, hear me, wherever this finds you.","The treaty still holds.","Oceans between us now, years between us now,","and still, if i get jollof and you get fried rice,","half of mine is yours.","It was always going to be yours.","It will be yours until the last plate","is cleared from the last table."],
    ["Come. Sit. The floor is cool.","There is enough."],
  ],
}, {
  id: "this-that-other",
  title: "this, that, and the other thing.",
  sub: "an ode to friendship and the human experience",
  excerpt: "we did not come because it was easy (we came with more questions than luggage, each of us carrying our separate weathers\u2026)",
  meta: <React.Fragment>{"poem \u00b7 2026 \u00b7 "}<strong style={{ fontWeight: 500 }}>by tachi</strong></React.Fragment>,
  illustration: "hand-heart",
  tailpiece: "hand-heart",
  note: [
    "Where I come from, a story is not finished until the teller turns to the listeners and accounts for himself. So let me account.",
    "I wrote this in the days after a retreat on Kauai, before the feeling could fade. I arrived as a man who had spent years learning how to build and how to strive, but had quietly forgotten how to rest, and how to be held by people who wanted nothing from me but my company. The island, and the people I met on it, reminded me. This poem is what I carried home.",
    "To the facilitators who held us with such care, thank you. You did not merely organize a retreat. You midwifed something none of us will forget.",
    "To my friends, my now family from all over this good earth, this one is for you. You know who you are.",
    "And a prayer, in the tradition of my mother's house. May we continue to be blessed, protected, and led. May we experience this life in the most beautiful way it can be experienced, with open hearts and laughter that finds us even in hard seasons. May love keep finding us, again and again, until we meet once more.",
  ],
  stanzas: [
    ["we did not come because it was easy","(we came with more questions","than luggage, each of us","carrying our separate weathers,","our little locked rooms of doubt)"],
    ["what will this be?","who will i be here?","nervous and hoping in the same breath,"],
    ["but faith is a door","that only opens","from the inside"],
    ["and so we jumped(all of us,","strangers from everywhere,","hearts held out like open hands)","into the unknown"],
    ["the mountain did not ask our names","it only said, climb.","the ocean did not ask our stories","it only said, come."],
    ["and we did the uncomfortable things.","climbed what scared us,","paddled into what humbled us,","said the true and trembling things out loud,","and somewhere in all that","beautiful difficulty,","bridges"],
    ["hand found hand across the stream","and laughter found laughter","and the difficult became","the beautiful became","the shared"],
    ["o me! o life! we might have asked,","what good, all this striving,","all these separate lives","rushing past each other?"],
    ["and the answer came(not in words","but in a hand reaching back,","in a circle of breath and song,","in strangers becoming family","on a beach at the edge of the world)"],
    ["the answer, that we are here.","that under every different face","there beats the same unreasonable","astonishing","heart"],
    ["that this stranger and that stranger","and the other thing we cannot name","(call it love, call it","the sea remembering itself","in every separate wave)"],
    ["are one"],
    ["and though we scatter now","to our separate corners of the earth,","hear me."],
    ["we shall meet again,","in every story told,","in every dream that wanders back","to this green island,","every remembering","a reunion"],
    ["for love keeps no distance","and love keeps no time"],
    ["so go(you who climbed,","you who jumped, you who opened)","go louder than your doubt,","go wider than your fear,","carry this,","this joy, that laughter, the other thing","too big for words,","carry it like a torch","into every room you enter"],
    ["we are bound now.","friends for life."],
    ["the powerful play goes on","and we, together,","have written our verse"],
    ["now,","what will yours be?"],
  ],
}, {
  id: "love-in-human-form",
  title: "love in human form",
  sub: "(for mummy)",
  excerpt: "if you want to know what love is, do not trouble the poets. they are guessing. come and sit with me a while…",
  meta: <React.Fragment>{"poem \u00b7 2026 \u00b7 "}<strong style={{ fontWeight: 500 }}>by tachi</strong></React.Fragment>,
  illustration: "mother-child",
  tailpiece: "mother-child",
  stanzas: [
    ["If you want to know what love is,","do not trouble the poets. They are guessing.","Come and sit with me a while.","I will tell you about my mother."],
    ["She smells like flowers that woke before the sun","and kept the dew for themselves.","Every room she enters","remembers what light was made for."],
    ["In an unpainted house in Lagos","she planted gardens front and back,","and in the middle of those gardens she planted us,","five boys, watered daily with songs and discipline,","and the whole street knew,","whatever that family lacks,","it is not love. Go and see.","The house with nothing was the house","everyone came to sit in.","Ask the neighbors which is worth more,","paint or that woman's table.","They will not need time to answer."],
    ["On the days hunger came to test us,","she did not let it find children weeping.","She gathered us like a choir instead,","and we sang, and we prayed, and we searched","the pockets and corners of the house","until the house surrendered its hidden coins,","twenty naira here, fifty there,","a cup of rice, tomatoes, onions,","and the pot went onto the fire like a victory drum.","Call it poverty if you must.","We knew it as communion."],
    ["And when fever came for me, her first born,","no car, no money, no helper on the road,","she bent her back and took me onto it","and walked. Miles, she walked,","the red dust keeping count of her steps.","Understand this and never forget it.","A mother's back is the first ambulance.","A mother's back is the oldest road in the world,","and it has never once refused a child."],
    ["Then the ocean, and America,","and watch what the woman did.","She cut her hair like a soldier entering service.","She learned a new country by night school lamplight,","three jobs, a dying caravan driven like a chariot,","and still, still, the smile at the door for her sons.","Only once did i see the full weight of it.","From a window in a trailer park in Texas,","i watched her sit beneath a tree and weep","the tears she never billed us for,","then wipe her face, gather her strength","like a woman gathering firewood,","and walk inside to love us as if nothing.","I was sixteen at that window.","I have been keeping a vow ever since."],
    ["And when death itself came to sit","at the foot of my hospital bed,","she outsat him. Day and night, she outsat him.","And torn between her God and her son,","between the law of her faith","and the blood hanging dark above my arm,","she did not choose. Hear me, she refused to choose.","She took my hands and prayed us both into one boat,","saying if there is punishment, let it fall on me.","Take me. Not him. Not Onome. Not my own.","Go and search every scripture, every proverb,","every love song ever sung under any moon.","You will not find a greater sentence."],
    ["So if i ever love you well,","friend, lover, listener, stranger,","somebody's child,","know that it is not my invention.","I learned it in an unpainted house,","under fruit trees, beside a singing pot,","from a woman who gave everything away daily","and somehow, like the widow's jar of oil,","never once ran empty."],
    ["I am her deep heart, walking.","I am her prayer, still being answered."],
  ],
}, {
  id: "sound-his-back-made",
  title: "the sound his back made",
  sub: "(for daddy)",
  excerpt: "they say the drum does not know the name of the hand that beats it. but the son knows. the son always knows…",
  meta: <React.Fragment>{"poem \u00b7 2026 \u00b7 "}<strong style={{ fontWeight: 500 }}>by tachi</strong></React.Fragment>,
  illustration: "arch-geometric",
  tailpiece: "arch-geometric",
  stanzas: [
    ["They say the drum does not know","the name of the hand that beats it.","But the son knows. The son always knows.","And hear this, for it is the turning of the whole story.","Now the hand knows too."],
    ["Begin where every good story begins,","in a house where rain announced itself","loudly on the zinc roof,","with a boy pressing his ear to his father's back,","listening to that voice from the inside,","deep rolling thunder moving through bone,","and thinking, so this is what safety sounds like.","This is what God must sound like","to the ones He carries."],
    ["Let me praise the man properly, as a son should."],
    ["My father, engineer and artist in one body,","a man whose hands could build a thing","and whose mouth could make a whole room laugh,","teller of tales, keeper of the gift of speech","that he passed down to me like land.","My father, watcher of the long road,","who returned from far journeys","with a bag that opened like a small treasure house,","biscuits, gifts, the smell of elsewhere,","and a doorway suddenly crowded with sons.","My father, who stayed behind in Nigeria","and fought for our survival with both hands","while an ocean sat between him and everything he loved.","A man does not do that for strangers.","A man does that for his own."],
    ["And yet. Every true praise-song tells the whole truth,","or it is only flattery, and flattery is a broken drum."],
    ["There was a night. I was nine.","The mathematics would not enter my head,","and your frustration became a storm","that forgot whose sky it lived in,","and a boy was made to speak a word against himself,","again, again, until the word crawled beneath his skin","and made a home there.","Failure. In my own small voice."],
    ["Father, i must tell you what that word built.","Towers. Degrees stacked like sandbags,","research posts, companies, machines that think,","a life spent running from one sentence,","Lagos to Texas to the very edge of space,","and the word running with me the whole way,","for no distance unsays a word.","Hear me. No tower unsays a word."],
    ["But listen now to how the story turns,","for it has turned, and i was there,","and i tell it as a witness tells it."],
    ["The son found his voice, after twenty-three years.","The mother, keeper of all the family's rooms,","carried the matter gently to the father.","And the father, grown grey in his labors,","could not sleep.","Hear that and understand the man.","He could not sleep.","An old lion pacing the night,","troubled that a wound he could not remember making","had lived so long in the body of his son."],
    ["And in the morning he wrote to me,","and i will carry his words to my grave","the way i once carried his thunder in my ear.","He wrote, you are the pride of my life.","He wrote, please forgive me, Onome,","and he translated my own name back to me","as if handing me my inheritance a second time.","Onome. Mine.","He asked to pray a father's blessing over his son.","He said the devil is a liar,","that no weapon fashioned against me shall prosper,","speaking scripture the way our house always spoke it,","as bread, as shield, as native tongue."],
    ["And i answered him as a son answers,","with the truest thing i know.","Father, no one is perfect.","We are all living life for the first time,","you included.","You included, daddy.","A man raising five sons with no manual,","no rehearsal, first take, every day, for decades,","on wages that finished before the month did.","And still we were loved. And still we were fed.","And still every one of us grew","into hands that build and hearts that feel.","Let the record of heaven show it plainly.","The man did well."],
    ["So here is what we did, my father and i,","and let every son and every father hear it."],
    ["He put down his guilt.","I put down my word.","Two men, setting their loads down","in the middle of the road,","straightening their backs,","looking at one another","for the first time without weight."],
    ["The scar stays. The sting does not.","The storm is forgiven. The thunder remains,","for the thunder was always love,","love that sometimes lost its language,","as love in hard countries sometimes does."],
    ["And one day my own children","will press their ears against my back","and hear that same deep rolling,","the inheritance of his voice in my body,","and it will only ever say,","you are mine, you are made of triumph,","you were never, never a failure."],
    ["They named me Onome.","My father himself wrote out the meaning.","Mine.","A man cannot be a failure","whose father, at the end of the long night,","reached out with both hands and claimed him."],
    ["The drum knows the hand now.","The hand knows the drum.","And the music they make together, at last,","is the music they were always meant to make."],
    ["I was always the son.","I am still the son.","Your son.","Your pride.","Your own."],
  ],
}, {
  id: "year-factory-stopped",
  title: "the year the factory stopped",
  sub: "(2022)",
  excerpt: "they say when death comes for a man he hears footsteps. mine came with wings…",
  meta: <React.Fragment>{"poem \u00b7 2026 \u00b7 "}<strong style={{ fontWeight: 500 }}>by tachi</strong></React.Fragment>,
  illustration: "cross-faith",
  tailpiece: "cross-faith",
  stanzas: [
    ["They say when death comes for a man he hears footsteps.","Mine came with wings."],
    ["An ordinary morning, an interview to prepare for,","a man stepping out of his front door","into a swarm of wasps, as if the old stories","had sent their smallest soldiers first.","Then the fall, the head against the driveway,","and the sun standing directly overhead","when i returned to myself,","a Texas heatwave pressing down like a hand,","and a fire in my blood reading one hundred and five."],
    ["Write their names in this story, for they earned it.","Kaitlyn. Andrew. Friends who came running","before the asking had finished leaving my mouth.","This is the first mercy. Mark it well.","Some of us are alive today","because somebody answered a text."],
    ["Then the hospital, and the needles,","and here the story turns strange.","One draw. A second. A third,","the nurse's face working hard at blankness","and failing, failing.","Then the doctor himself, fourth needle in hand,","speaking the sentence that divides a life","into before and after.","Either our machines are wrong,","or you have hours."],
    ["Understand what had happened inside me.","The factory in my bones had gone silent.","Red cells, white cells, platelets,","all of them gone the way harmattan strips a tree,","leaf by leaf, until the branches stand bare","and no one can say which wind took the first one.","No reason, they said, that i should be speaking."],
    ["And yet i was speaking."],
    ["(Why are you alive, the readings asked.","Why are you alive, the doctors asked.","I did not know yet","that a question can be a door.)"],
    ["They wheeled me toward the room of gas and sleep,","and terror sat on my chest like a stone,","and i, a man who had wandered far","from his father's house,","whose prayers had gone quiet in his mouth","through all the busy years,","ran home the only way left to run.","Father, it is me. I am sorry i turned away.","Save me, and i am yours.","Heal me, and i am your instrument.","My story has only begun. My work is not finished.","I vow it. I vow it."],
    ["A man does not forget a prayer like that.","A debt like that does not expire."],
    ["Then the night of blood.","Four bags of a stranger's mercy","hanging above me like dark fruit,","and my mother beside me through all of it,","torn between her God and her son,","refusing to release my hand.","What she prayed that night is written whole","in her own praise-song, where it belongs,","and i will not spend it twice.","Know only that she offered heaven a trade","no court in any world could refuse."],
    ["(Somewhere tonight a stranger's blood","is still walking around inside me.","I never learned their name.","I have become their thank you letter.)"],
    ["And days later, listen well,","the fires in my bones were lit again.","Slowly, the way green returns after harmattan,","branch by branch, tree by tree,","until the land forgets it was ever bare.","No diagnosis. No mechanism. No answer.","The doctors closed a file","on a question that cannot close."],
    ["They never found what tried to kill me.","I never found the edge of what saved me."],
    ["So i live now as the answer","to a question no one can properly ask.","Alive on purpose. Alive like a vow","walking around in shoes.","And when the work grows heavy","and the race feels long,","i return to the man on the gurney","begging heaven for one more chapter,","and i tell him,"],
    ["we got it. We got the chapter.","Now write it well."],
  ],
}];
function PoemsScreen({ onNavigate }) {
  const [poemId, setPoemId] = React.useState(null);
  const poem = POEMS.find((p) => p.id === poemId);
  if (poem) {
    return (
      <section className="view" key={poem.id}>
        <TopBar active="poems" onNavigate={onNavigate} />
        <a href="#" onClick={(e) => { e.preventDefault(); setPoemId(null); }}
          style={{ display: "inline-block", fontFamily: "var(--font-utility)", fontWeight: 300, fontSize: "var(--size-caption)", letterSpacing: "var(--track-nav)", textTransform: "lowercase", color: "var(--ink-soft)", marginBottom: "2.2rem" }}>{"\u2190 the shorter breaths"}</a>
        <SectionHeading title={poem.title} note={poem.sub} />
        {poem.note && (
          <div style={{ marginBottom: "2.8rem", paddingBottom: "2.4rem", borderBottom: "1px solid var(--hairline)" }}>
            <div style={{ fontFamily: "var(--font-utility)", fontWeight: 300, fontSize: "var(--size-hint)", letterSpacing: "var(--track-poemtitle)", textTransform: "lowercase", color: "var(--accent)", marginBottom: "1.4rem" }}>a note from the author</div>
            {poem.note.map((n, i) => <p key={i} style={{ fontStyle: "italic", color: "var(--ink-soft)", marginBottom: "var(--ma-para)", maxWidth: "56ch" }}>{n}</p>)}
            <p style={{ fontStyle: "italic", color: "var(--ink-soft)" }}>With love and gratitude,<br />Tachi</p>
          </div>
        )}
        <Poem tailpiece={poem.tailpiece}>
          {poem.stanzas.map((st, i) => {
            const lines = Array.isArray(st) ? st : st.lines;
            const Wrap = Array.isArray(st) ? React.Fragment : "em";
            return (
              <React.Fragment key={i}>
                <Wrap>{lines.map((l, j) => <React.Fragment key={j}>{l}<br /></React.Fragment>)}</Wrap>
                <span style={{ display: "block", height: "1.6rem" }}></span>
              </React.Fragment>
            );
          })}
          <em>{"\u2014 tachi"}</em>
        </Poem>
      </section>
    );
  }
  return (
    <section className="view">
      <TopBar active="poems" onNavigate={onNavigate} />
      <SectionHeading title="Poems" note="the shorter breaths" />
      {POEMS.map((p) => (
        <PieceEntry key={p.id} title={p.title} sub={p.sub} excerpt={p.excerpt} meta={p.meta} illustration={p.illustration} onClick={() => setPoemId(p.id)} />
      ))}
    </section>
  );
}
