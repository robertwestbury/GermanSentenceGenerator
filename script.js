const endings = {
  the: {
    nouns: {
      m: "Der",
      f: "Die",
      n: "Das",
      pl: "Die"
    },
    adjectives: {
      m: "e",
      f: "e",
      n: "e",
      pl: "en"
    }
  },
  a: {
    nouns: {
      m: "en",
      f: "eine",
      n: "ein",
      pl: "keine"
    },
    adjectives: {
      m: "er",
      f: "e",
      n: "es",
      pl: "en"
    }
  }
};

let nouns = [];
let adjectives = [];
let mode = "";

const generate = () => {
  parseNouns();
  parseAdjectives();
  parseMode();

  makeSentences();
};

const parseMode = () => {
  const val = $("input[class=mode]").val();

  if (val == 0) mode = "theanda";
  if (val == 1) mode = "the";
  if (val == -1) mode == "a";
};

const parseNouns = () => {
  const split = document.getElementsByClassName("nouns")[0].value.split(",");

  nouns = split.map(str => {
    const noun = str.trimLeft().split(" ")[0];

    let a = str.trimLeft().split(" ");
    a.shift();

    const gender = a
      .join("")
      .replace("(", "")
      .replace(")", "")
      .trim();

    return { noun, gender };
  });
};

const parseAdjectives = () => {
  const split = document
    .getElementsByClassName("adjectives")[0]
    .value.split(",");

  adjectives = split.map(s => {
    return s.trim();
  });
};

const makeSentences = () => {
  let sentences = [];

  for (i = 0; i < 20; i++) {
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    console.log(adjective);

    let sentance;

    if (mode == "theanda") {
      let todo = Math.random() > 0.5 ? "the" : "a";

      if (todo == "the") {
        sentance = `${endings.the.nouns[noun.gender]} ${adjective}${endings.the.adjectives[noun.gender]} ${
          noun.noun
        }`;
      } else {
        sentance = `${endings.a.nouns[noun.gender]} ${adjective}${endings.a.adjectives[noun.gender]} ${noun.noun}`;
      }
    }

    if (mode == "the") {
      sentance = `${endings.the.nouns[noun.gender]} ${adjective}${endings.the.adjectives[noun.gender]} ${noun.noun}`;
    }

    if (mode == "a") {
      sentance = `${endings.a.nouns[noun.gender]} ${adjective}${endings.a.adjectives[noun.gender]} ${noun.noun}`;
    }

    sentences.push(sentance);
  }

  document.getElementsByClassName("results")[0].innerHTML = sentences
    .map(sen => {
      return `<div class="col s12 m7" style="width: 100%;">
                <div class="card horizontal">
                  <div class="card-stacked">
                    <div class="card-content">
                      <p>${sen}</p>
                    </div>
                  </div>
                </div>
              </div>`;
    })
    .join("\n");
};
