"use strict";
var roles = [
  "Аммос Федорович",
  "Городничий",
  "Бобчинский",
  "Свистунов",
  "Артемий Филиппович"
];

var textLines = `Аммос Федорович. Нет, нет! Вперед пустить голову, духовенство, купечество; вот и в книге «Деяния Иоанна Масона»...
Городничий. Нет, нет; позвольте уж мне самому. Бывали трудные случаи в жизни, сходили, еще даже и спасибо получал. Авось Бог вынесет и теперь. (Обращаясь к Бобчинскому.) Вы говорите, он молодой человек?
Бобчинский. Молодой, лет двадцати трех или четырех с небольшим.
Городничий. Тем лучше: молодого скорее пронюхаешь. Беда, если старый черт, а молодой весь наверху. Вы, господа, приготовляйтесь по своей части, а я отправлюсь сам или вот хоть с Петром Ивановичем, приватно, для прогулки, наведаться, не терпят ли проезжающие неприятностей. Эй, Свистунов!
Свистунов. Что угодно?
Городничий. Ступай сейчас за частным приставом; или нет, ты мне нужен. Скажи там кому-нибудь, чтобы как можно поскорее ко мне частного пристава, и приходи сюда.
Квартальный бежит впопыхах.
Артемий Филиппович. Идем, идем, Аммос Федорович! В самом деле может случиться беда.
Аммос Федорович. Да вам чего бояться? Колпаки чистые надел на больных, да и концы в воду.
Артемий Филиппович. Какое колпаки! Больным велено габерсуп давать, а у меня по всем коридорам несет такая капуста, что береги только нос.
Аммос Федорович. А я на этот счет покоен. В самом деле, кто зайдет в уездный суд? А если и заглянет в какую-нибудь бумагу, так он жизни не будет рад. Я вот уж пятнадцать лет сижу на судейском стуле, а как загляну в докладную записку — а! только рукой махну. Сам Соломон не разрешит, что в ней правда и что неправда.
Судья, попечитель богоугодных заведений, смотритель училищ и почтмейстер уходят и в дверях сталкиваются с возвращающимся квартальным.`;

var words = GetArray(textLines);
// PrintArray(words);
var actors = SplitReplicas(words);
// PrintArray(actors);
var result = GetResult(actors, roles);

PrintResult(result);

function GetArray(_text) {
  let words = _text.split("\n");
  return words;
}

function SplitReplicas(_words) {
  let replicas = new Array();
  for (let i = 0; i < _words.length; i++) {
    const element = {};
    let dotIndex = _words[i].indexOf(".") + 2;

    const temp = {};
    temp.index = i;
    if (dotIndex == _words[i].length + 1 || dotIndex == 1) {
      element.name = "Рассказчик";
      temp.words = _words[i];
    } else {
      element.name = _words[i].split(".", 1);
      temp.words = _words[i].slice(dotIndex);
    }

    element.replica = temp;
    replicas.push(element);
  }
  return replicas;
}

function GetResult(_splitString, _roles) {
  let actors = new Array();
  for (const roleName of _roles) {
    let actor = { name: roleName, replicas: [] };
    for (let index = 0; index < _splitString.length; index++) {
      if (roleName == _splitString[index].name) {
        actor.replicas.push(_splitString[index].replica);
      }
    }

    actors.push(actor);
  }
  let actor = { name: "Рассказчик", replicas: [] };
  for (let index = 0; index < _splitString.length; index++) {
    if (_splitString[index].name == "Рассказчик") {
      actor.replicas.push(_splitString[index].replica);
    }
  }
  actors.push(actor);
  return actors;
}

function PrintResult(_actors) {
  for (const actor of _actors) {
    console.log(actor.name + ":");
    for (const re of actor.replicas) {
      console.log(re.index + 1 + ") " + re.words);
    }
  }
}
