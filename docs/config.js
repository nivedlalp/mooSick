const langs = [
    { title: 'English', path: '/home', matchPath: /^\/(home|ecosystem|support)/ },
];

docute.init({
    landing: 'landing.html',
    title: 'mooSick',
    nav: {
        default: [
            { title: 'Home', path: '/home' },
        ],
    },
    plugins: [
        player(),
    ]
});

function insertUmamiJS(id, url) {
    var script = document.createElement('script');
    script.setAttribute("data-website-id", id);
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}

function player() {
    return function (context) {
        context.event.on('landing:updated', function () {
            clearPlayer();
            aplayer1();
        });

        context.event.on('content:updated', function () {
            clearPlayer();
            document.querySelectorAll('.load').forEach(el => {
                el.addEventListener('click', function () {
                    window[this.parentElement.id] && window[this.parentElement.id]();
                });
            });
        });
    };
}

function clearPlayer() {
    for (let i = 0; i < 10; i++) {
        if (window['ap' + i]) {
            window['ap' + i].destroy();
        }
    }
}

const PLAYER_KEY = "moosick_player_state";

let saveTimer = null;
let restored = false;
let ready = false;

function savePlayerState() {
    if (!window.ap1 || !ready) return;

    clearTimeout(saveTimer);

    saveTimer = setTimeout(() => {
        localStorage.setItem(PLAYER_KEY, JSON.stringify({
            index: window.ap1.list.index,
            volume: window.ap1.audio.volume,
            time: window.ap1.audio.currentTime || 0
        }));
    }, 500);
}

function loadPlayerState() {
    const raw = localStorage.getItem(PLAYER_KEY);
    return raw ? JSON.parse(raw) : null;
}

function restoreState() {
    if (restored || !window.ap1) return;
    restored = true;

    const saved = loadPlayerState();
    console.log("saved", saved);

    if (!saved) return;

    const apply = () => {
        if (typeof saved.volume === "number") {
            window.ap1.volume(saved.volume, true);
        }

        if (typeof saved.index === "number") {
            window.ap1.list.switch(saved.index);
        }

        setTimeout(() => {
            if (typeof saved.time === "number") {
                window.ap1.seek(saved.time);
            }
        }, 800);
    };

    apply();
}

function aplayer1() {
    window.ap1 = new APlayer({
        container: document.getElementById('aplayer1'),
        theme: '#F57F17',
        audio: [
            {
                name: 'Something Good Can Work',
                artist: 'alt-J',
                url: 'music/alt-J – Something Good.mp3',
                cover: 'music/alt-J – Something Good.png',
                theme: '#968d7f'
            },
            {
                name: 'Escapee',
                artist: 'Architecture in Helsinki',
                url: 'music/Architecture in Helsinki – Escapee.mp3',
                cover: 'music/Architecture in Helsinki – Escapee.png',
                theme: '#5e9a51'
            },
            {
                name: 'Do I Wanna Know',
                artist: 'Arctic Monkeys',
                url: 'music/Arctic Monkeys – Do I Wanna Know.mp3',
                cover: 'music/Arctic Monkeys – Do I Wanna Know.png',
                theme: '#38967a'
            },
            {
                name: 'Fluorescent Adolescent',
                artist: 'Arctic Monkeys',
                url: 'music/Arctic Monkeys – Fluorescent Adolescent.mp3',
                cover: 'music/Arctic Monkeys – Fluorescent Adolescent.png',
                theme: '#76354a'
            },
            {
                name: 'Be Yourself',
                artist: 'Audioslave',
                url: 'music/Audioslave – Be Yourself.mp3',
                cover: 'music/Audioslave – Be Yourself.png',
                theme: '#9e2d75'
            },
            {
                name: 'Olympic',
                artist: 'Ayres',
                url: 'music/Ayres – Olympic.mp3',
                cover: 'music/Ayres – Olympic.png',
                theme: '#4d9691'
            },
            {
                name: 'Pompeii',
                artist: 'Bastille',
                url: 'music/Bastille – Pompeii.mp3',
                cover: 'music/Bastille – Pompeii.png',
                theme: '#752a88'
            },
            {
                name: 'American Authors',
                artist: 'Best day of my life',
                url: 'music/Best day of my life – American Authors.mp3',
                cover: 'music/Best day of my life – American Authors.png',
                theme: '#9e9789'
            },
            {
                name: 'Song 2',
                artist: 'Blur',
                url: 'music/Blur – Song 2.mp3',
                cover: 'music/Blur – Song 2.png',
                theme: '#60869d'
            },
            {
                name: 'Knockin’ On Heaven’s Door',
                artist: 'Bob Dylan',
                url: 'music/Bob Dylan – Knockin’ On Heaven’s Door.mp3',
                cover: 'music/Bob Dylan – Knockin’ On Heaven’s Door.png',
                theme: '#91285e'
            },
            {
                name: 'Electric Love',
                artist: 'BØRNS',
                url: 'music/BØRNS – Electric Love.mp3',
                cover: 'music/BØRNS – Electric Love.png',
                theme: '#7e3b47'
            },
            {
                name: 'Jerk It Out',
                artist: 'Caesars',
                url: 'music/Caesars – Jerk It Out.mp3',
                cover: 'music/Caesars – Jerk It Out.png',
                theme: '#62456d'
            },
            {
                name: 'Safe and Sound',
                artist: 'Capital Cities',
                url: 'music/Capital Cities – Safe and Sound.mp3',
                cover: 'music/Capital Cities – Safe and Sound.png',
                theme: '#65732a'
            },
            {
                name: 'First',
                artist: 'Cold War Kids',
                url: 'music/Cold War Kids – First.mp3',
                cover: 'music/Cold War Kids – First.png',
                theme: '#4b9a57'
            },
            {
                name: 'Wicked Ones',
                artist: 'Dorothy',
                url: 'music/Dorothy – Wicked Ones.mp3',
                cover: 'music/Dorothy – Wicked Ones.png',
                theme: '#383b79'
            },
            {
                name: 'Beck',
                artist: 'Dreams',
                url: 'music/Dreams – Beck.mp3',
                cover: 'music/Dreams – Beck.png',
                theme: '#2b5385'
            },
            {
                name: 'Home',
                artist: 'Edward Sharpe & The Magnetic Zeros',
                url: 'music/Edward Sharpe & The Magnetic Zeros – Home.mp3',
                cover: 'music/Edward Sharpe & The Magnetic Zeros – Home.png',
                theme: '#513563'
            },
            {
                name: 'Walking on a Dream',
                artist: 'Empire of the Sun',
                url: 'music/Empire of the Sun – Walking on a Dream.mp3',
                cover: 'music/Empire of the Sun – Walking on a Dream.png',
                theme: '#453d2d'
            },
            {
                name: 'Bring Me to Life',
                artist: 'Evanescence',
                url: 'music/Evanescence – Bring Me to Life.mp3',
                cover: 'music/Evanescence – Bring Me to Life.png',
                theme: '#2d442a'
            },
            {
                name: 'Dog Days Are Over',
                artist: 'Florence + The Machine',
                url: 'music/Florence + The Machine – Dog Days Are Over.mp3',
                cover: 'music/Florence + The Machine – Dog Days Are Over.png',
                theme: '#709c6c'
            },
            {
                name: 'Come Alive',
                artist: 'FMLYBND',
                url: 'music/FMLYBND – Come Alive.mp3',
                cover: 'music/FMLYBND – Come Alive.png',
                theme: '#6f9d80'
            },
            {
                name: 'Everlong',
                artist: 'Foo Fighters',
                url: 'music/Foo Fighters – Everlong.mp3',
                cover: 'music/Foo Fighters – Everlong.png',
                theme: '#2d3979'
            },
            {
                name: 'Pumped Up Kicks',
                artist: 'Foster the People',
                url: 'music/Foster the People – Pumped Up Kicks.mp3',
                cover: 'music/Foster the People – Pumped Up Kicks.png',
                theme: '#514634'
            },
            {
                name: 'Take Me Out',
                artist: 'Franz Ferdinand',
                url: 'music/Franz Ferdinand – Take Me Out.mp3',
                cover: 'music/Franz Ferdinand – Take Me Out.png',
                theme: '#728a3e'
            },
            {
                name: 'Budapest',
                artist: 'George Ezra',
                url: 'music/George Ezra – Budapest.mp3',
                cover: 'music/George Ezra – Budapest.png',
                theme: '#863d5d'
            },
            {
                name: 'Youth',
                artist: 'Glass Animals',
                url: 'music/Glass Animals – Youth.mp3',
                cover: 'music/Glass Animals – Youth.png',
                theme: '#7f7d41'
            },
            {
                name: 'Somebody That I Used to Know',
                artist: 'Gotye',
                url: 'music/Gotye – Somebody That I Used to Know.mp3',
                cover: 'music/Gotye – Somebody That I Used to Know.png',
                theme: '#4c2d75'
            },
            {
                name: 'On Top of the World',
                artist: 'Imagine Dragons',
                url: 'music/Imagine Dragons – On Top of the World.mp3',
                cover: 'music/Imagine Dragons – On Top of the World.png',
                theme: '#648a99'
            },
            {
                name: 'Tightrope',
                artist: 'Janelle Monáe',
                url: 'music/Janelle Monáe – Tightrope.mp3',
                cover: 'music/Janelle Monáe – Tightrope.png',
                theme: '#743744'
            },
            {
                name: 'Heartbeats',
                artist: 'José González',
                url: 'music/José González – Heartbeats.mp3',
                cover: 'music/José González – Heartbeats.png',
                theme: '#6e6b72'
            },
            {
                name: 'Clubfoot',
                artist: 'Kasabian',
                url: 'music/Kasabian – Clubfoot.mp3',
                cover: 'music/Kasabian – Clubfoot.png',
                theme: '#9e715c'
            },
            {
                name: 'Fire',
                artist: 'Kasabian',
                url: 'music/Kasabian – Fire.mp3',
                cover: 'music/Kasabian – Fire.png',
                theme: '#7c915f'
            },
            {
                name: 'Somewhere Only We Know',
                artist: 'Keane',
                url: 'music/Keane – Somewhere Only We Know.mp3',
                cover: 'music/Keane – Somewhere Only We Know.png',
                theme: '#815c90'
            },
            {
                name: 'Emptiness Machine',
                artist: 'Linkin Park',
                url: 'music/Linkin Park – Emptiness Machine.mp3',
                cover: 'music/Linkin Park – Emptiness Machine.png',
                theme: '#29464a'
            },
            {
                name: 'Heavy Is the Crown',
                artist: 'Linkin Park',
                url: 'music/Linkin Park – Heavy Is the Crown.mp3',
                cover: 'music/Linkin Park – Heavy Is the Crown.png',
                theme: '#959f78'
            },
            {
                name: 'Leave Out All the Rest',
                artist: 'Linkin Park',
                url: 'music/Linkin Park – Leave Out All the Rest.mp3',
                cover: 'music/Linkin Park – Leave Out All the Rest.png',
                theme: '#808388'
            },
            {
                name: 'One More Light',
                artist: 'Linkin Park',
                url: 'music/Linkin Park – One More Light.mp3',
                cover: 'music/Linkin Park – One More Light.png',
                theme: '#5d4029'
            },
            {
                name: 'Up From the Bottom',
                artist: 'Linkin Park',
                url: 'music/Linkin Park – Up From the Bottom.mp3',
                cover: 'music/Linkin Park – Up From the Bottom.png',
                theme: '#799c9b'
            },
            {
                name: 'Freebird',
                artist: 'Lynyrd Skynyrd',
                url: 'music/Lynyrd Skynyrd – Freebird.mp3',
                cover: 'music/Lynyrd Skynyrd – Freebird.png',
                theme: '#798f6c'
            },
            {
                name: 'Midnight City',
                artist: 'M83',
                url: 'music/M83 – Midnight City.mp3',
                cover: 'music/M83 – Midnight City.png',
                theme: '#4b2d41'
            },
            {
                name: 'Let’s Go',
                artist: 'Matt and Kim',
                url: 'music/Matt and Kim – Let’s Go.mp3',
                cover: 'music/Matt and Kim – Let’s Go.png',
                theme: '#6c332b'
            },
            {
                name: 'Kids',
                artist: 'MGMT',
                url: 'music/MGMT – Kids.mp3',
                cover: 'music/MGMT – Kids.png',
                theme: '#557b43'
            },
            {
                name: 'Time to Pretend',
                artist: 'MGMT',
                url: 'music/MGMT – Time to Pretend.mp3',
                cover: 'music/MGMT – Time to Pretend.png',
                theme: '#54544c'
            },
            {
                name: 'Don’t Forget Who You Are',
                artist: 'Miles Kane',
                url: 'music/Miles Kane – Don’t Forget Who You Are.mp3',
                cover: 'music/Miles Kane – Don’t Forget Who You Are.png',
                theme: '#8d623d'
            },
            {
                name: 'Down By the River',
                artist: 'Milky Chance',
                url: 'music/Milky Chance – Down By the River.mp3',
                cover: 'music/Milky Chance – Down By the River.png',
                theme: '#44568e'
            },
            {
                name: 'Stolen Dance',
                artist: 'Milky Chance',
                url: 'music/Milky Chance – Stolen Dance.mp3',
                cover: 'music/Milky Chance – Stolen Dance.png',
                theme: '#389789'
            },
            {
                name: 'Float On',
                artist: 'Modest Mouse',
                url: 'music/Modest Mouse – Float On.mp3',
                cover: 'music/Modest Mouse – Float On.png',
                theme: '#495f37'
            },
            {
                name: 'Supermassive Black Hole',
                artist: 'Muse',
                url: 'music/Muse – Supermassive Black Hole.mp3',
                cover: 'music/Muse – Supermassive Black Hole.png',
                theme: '#99938b'
            },
            {
                name: 'Smells Like Teen Spirit',
                artist: 'Nirvana',
                url: 'music/Nirvana – Smells Like Teen Spirit.mp3',
                cover: 'music/Nirvana – Smells Like Teen Spirit.png',
                theme: '#66795d'
            },
            {
                name: 'Don’t Look Back in Anger',
                artist: 'Oasis',
                url: 'music/Oasis – Don’t Look Back in Anger.mp3',
                cover: 'music/Oasis – Don’t Look Back in Anger.png',
                theme: '#2a3682'
            },
            {
                name: 'Linkin Park',
                artist: 'Over each other',
                url: 'music/Over each other – Linkin Park.mp3',
                cover: 'music/Over each other – Linkin Park.png',
                theme: '#753e54'
            },
            {
                name: 'Ordinary Man',
                artist: 'Ozzy Osbourne',
                url: 'music/Ozzy Osbourne – Ordinary Man.mp3',
                cover: 'music/Ozzy Osbourne – Ordinary Man.png',
                theme: '#997191'
            },
            {
                name: 'Take a Walk',
                artist: 'Passion Pit',
                url: 'music/Passion Pit – Take a Walk.mp3',
                cover: 'music/Passion Pit – Take a Walk.png',
                theme: '#6a3164'
            },
            {
                name: 'Young Folks',
                artist: 'Peter Bjorn and John',
                url: 'music/Peter Bjorn and John – Young Folks.mp3',
                cover: 'music/Peter Bjorn and John – Young Folks.png',
                theme: '#4e583e'
            },
            {
                name: 'Where Is My Mind',
                artist: 'Pixies',
                url: 'music/Pixies – Where Is My Mind.mp3',
                cover: 'music/Pixies – Where Is My Mind.png',
                theme: '#45523c'
            },
            {
                name: 'Live in the Moment',
                artist: 'Portugal. The Man',
                url: 'music/Portugal. The Man – Live in the Moment.mp3',
                cover: 'music/Portugal. The Man – Live in the Moment.png',
                theme: '#735554'
            },
            {
                name: 'Creep',
                artist: 'Radiohead',
                url: 'music/Radiohead – Creep.mp3',
                cover: 'music/Radiohead – Creep.png',
                theme: '#643289'
            },
            {
                name: 'Dreaming',
                artist: 'Smallpools',
                url: 'music/Smallpools – Dreaming.mp3',
                cover: 'music/Smallpools – Dreaming.png',
                theme: '#9f8670'
            },
            {
                name: 'Mystery of Love',
                artist: 'Sufjan Stevens',
                url: 'music/Sufjan Stevens – Mystery of Love.mp3',
                cover: 'music/Sufjan Stevens – Mystery of Love.png',
                theme: '#2c5a89'
            },
            {
                name: 'Mr. Brightside',
                artist: 'The Killers',
                url: 'music/The Killers – Mr. Brightside.mp3',
                cover: 'music/The Killers – Mr. Brightside.png',
                theme: '#579a85'
            },
            {
                name: 'Ho Hey',
                artist: 'The Lumineers',
                url: 'music/The Lumineers – Ho Hey.mp3',
                cover: 'music/The Lumineers – Ho Hey.png',
                theme: '#88693f'
            },
            {
                name: 'Gimme Shelter',
                artist: 'The Rolling Stones',
                url: 'music/The Rolling Stones – Gimme Shelter.mp3',
                cover: 'music/The Rolling Stones – Gimme Shelter.png',
                theme: '#99794f'
            },
            {
                name: 'On Our Way',
                artist: 'The Royal Concept',
                url: 'music/The Royal Concept – On Our Way.mp3',
                cover: 'music/The Royal Concept – On Our Way.png',
                theme: '#83734b'
            },
            {
                name: 'Reptilia',
                artist: 'The Strokes',
                url: 'music/The Strokes – Reptilia.mp3',
                cover: 'music/The Strokes – Reptilia.png',
                theme: '#4d327c'
            },
            {
                name: 'Someday',
                artist: 'The Strokes',
                url: 'music/The Strokes – Someday.mp3',
                cover: 'music/The Strokes – Someday.png',
                theme: '#5f9933'
            },
            {
                name: 'Sweet Disposition',
                artist: 'The Temper Trap',
                url: 'music/The Temper Trap – Sweet Disposition.mp3',
                cover: 'music/The Temper Trap – Sweet Disposition.png',
                theme: '#7c8a49'
            },
            {
                name: 'Seven Nation Army',
                artist: 'The White Stripes',
                url: 'music/The White Stripes – Seven Nation Army.mp3',
                cover: 'music/The White Stripes – Seven Nation Army.png',
                theme: '#9e7693'
            },
            {
                name: 'Riptide',
                artist: 'Vance Joy',
                url: 'music/Vance Joy – Riptide.mp3',
                cover: 'music/Vance Joy – Riptide.png',
                theme: '#418a97'
            }]
    });
    initPlayerControls();
    ready = true;

    window.ap1.on('play', savePlayerState);
    window.ap1.on('pause', savePlayerState);
    window.ap1.on('volumechange', savePlayerState);
    window.ap1.on('listswitch', () => setTimeout(savePlayerState, 300));

    setTimeout(restoreState, 1200);
}

function initPlayerControls() {
    const checkPlayer = setInterval(() => {
        const playerMusic = document.querySelector('#aplayer1 .aplayer-music');
        if (!playerMusic) return;

        clearInterval(checkPlayer);

        const controls = document.createElement('div');
        controls.className = 'aplayer-ext-controls';

        const prevBtn = document.createElement('span');
        prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>';
        prevBtn.className = 'aplayer-ext-btn';
        prevBtn.onclick = () => window.ap1.skipBack();

        const nextBtn = document.createElement('span');
        nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>';
        nextBtn.className = 'aplayer-ext-btn';
        nextBtn.onclick = () => window.ap1.skipForward();

        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        playerMusic.appendChild(controls);
    }, 100);
}