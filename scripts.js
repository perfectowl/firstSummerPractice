window.onload=function(){
document.getElementById("tableTonic").addEventListener("change",giveAnswer);
document.getElementById("tableLad").addEventListener("change",giveAnswer);
document.getElementById("tableChord").addEventListener("change",giveAnswer);
  function giveAnswer(){
    back();
    var tonic = Number(document.getElementById("tableTonic").value);
    var lad = document.getElementById("tableLad").value;
    var chord = document.getElementById("tableChord").value;
    var mainNote = tonic;
    //определяем "набор нот" (зависит от БУКВЫ в аккорде (T,S,D)):
    switch(chord[0]){
      case "S":
      mainNote += 3;
      break;
      case "D": 
      mainNote += 4;
      break;
      }
    //стабилизация степеней (max степень - 7, если выше - перевод в норм вид):
    if (mainNote > 7) mainNote-=7;
    let note2 = mainNote+2; let note3 = mainNote+4;
    let noteArray = [mainNote, note2, note3];
    //опять стабилизация степеней:
    for (let i = 0; i < noteArray.length; i++){
      if (noteArray[i] > 7) noteArray[i]-=7;
    } 
    //определяем "порядок нот" (зависит от ЦИФР в аккорде (53, 60, 64)):
    if (chord[1]=="6") {
      noteArray.push(noteArray[0]);
      noteArray.shift();
      if (chord[2]=="4") {
        noteArray.push(noteArray[0]);
        noteArray.shift();
      }
    }
    //временный дебаг
    //let accord = noteArray[0] + " " + noteArray[1] + " " + noteArray[2];
    //document.getElementById("result").value = accord;
    //результат работы выше: правильные степени в правильном порядке.
    //переведем численные значения нот - степени - в ответ в буквенном виде в зависимости от тональности:
    var answer = "";
    switch(lad){
      case "minor":
        answer = lad_helper(noteArray,dict_minor[tonic]);
        break;
      case "hminor":
        answer = lad_helper(noteArray,dict_hminor[tonic]);
        break;
      case "mminor":
        answer = lad_helper(noteArray,dict_mminor[tonic]);
        break;
      case "major":
        answer = lad_helper(noteArray,dict_major[tonic]);
        break;
      case "hmajor":
        answer = lad_helper(noteArray,dict_hmajor[tonic]);
        break;
      case "mmajor":
        answer = lad_helper(noteArray,dict_mmajor[tonic]);
        break;
    }
    document.getElementById("result").value = answer;
    //результат работы выше: ответ в виде "До Ми ьСоль" (пример)
  }
}
//0 - бемоль, 1 - без изменений, 2 - диез
//до 1, ре 2, ми 3, фа 4, соль 5, ля 6, си 7
//dictionary в JS: https://flexiple.com/javascript/javascript-dictionary/

var dict_minor = {"1": "1101100", //минор
"2": "1111110", "3": "2111111", "4": "1001100",
"5": "1101110", "6": "1111111", "7": "2112111",
}

var dict_major = {"1": "1111111", //мажор
"2": "2112111", "3": "2212211", "4": "1111110",
"5": "1112111", "6": "2112211", "7": "2212221",
}

var dict_hminor = {"1": "1101101", //гармонич. минор
"2": "2111110", "3": "1212111", "4": "1011100",
"5": "1102110", "6": "1111211", "7": "2112121",
}

var dict_hmajor = {"1": "1111101", //гармонич. мажор
"2": "2112110", "3": "1212211", "4": "1011110",
"5": "1102111", "6": "2111211", "7": "2212121",
}

var dict_mminor = {"1": "1101111", //мелодич. минор
"2": "2111111", "3": "2212111", "4": "1111100",
"5": "1112110", "6": "1112211", "7": "2112221",
}

var dict_mmajor = {"1": "1111100", //мелодич. мажор
"2": "1112110", "3": "1112211", "4": "1001110",
"5": "1101111", "6": "2111111", "7": "2212111",
}

var noteNames = ["0","До","Ре","Ми","Фа","Соль","Ля","Си"];

function lad_helper(f_noteArray, f_rules){ //добавление знаков нот, бемоль/диезов, в ответ; вызов выделения нот
  var answer = "";
  for (var i = 0; i < f_noteArray.length; i++){
    if (f_rules[f_noteArray[i]-1] == "1"){
      playkey(f_noteArray[i]);
    } else
    if (f_rules[f_noteArray[i]-1]=="0") {
      answer += "b";
      playsharp(f_noteArray[i],'0');
    } else
    if (f_rules[f_noteArray[i]-1]=="2") {
      answer += "#";
      playsharp(f_noteArray[i],'2');
    }
    answer += noteNames[f_noteArray[i]] + " ";
  }
  return answer; 
}

function playkey(note){ //выделение обычной клавиши
  var i = note + 7;
  document.images['t' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
  document.images['m' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
	document.images['b' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
}

function playsharp(note,rule){ //выделение бемоль/диез клавиш
  if(((note == 4)||(note == 1))&&(rule=='0')){ //если фа бемоль ( => ми) или если до бемоль ( => си)
    var i = note - 1;
    document.images['t' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
    document.images['m' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
	  document.images['b' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
  } if(((note == 3)||(note == 7))&&(rule=='2')){ //если ми диез ( => фа) или если ля диез ( => до)
    var i = note + 1;
    document.images['t' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
    document.images['m' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
	  document.images['b' + i +''].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
  } else {
    var i = note + 5;
    if (note >= 4) i-=1; //из-за пропуска черной клавиши между 3 и 4 степенями
    if (rule=="0") { //если бемоль, ссылка на пред. черную клавишу
      i -= 1;
    }
    document.images['s' + i +'b1'].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
	  document.images['s' + i +'b2'].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
	  document.images['s' + i +'b3'].src = "https://images.wallpaperscraft.ru/image/single/goluboj_tsvet_fon_156180_225x300.jpg";
  }
}

function back() { //сбрасывание цвета нот
  if (document.images){
	for (var i = 1; i < 22; i++) {
		if (document.images['t' + i +''].src != "https://www.apassion4jazz.net/images/vpcblank.gif") {
	  document.images['t' + i +''].src = "https://www.apassion4jazz.net/images/vpcblank.gif";
    document.images['m' + i +''].src = "https://www.apassion4jazz.net/images/vpcblank.gif";
	  document.images['b' + i +''].src = "https://www.apassion4jazz.net/images/vpcblank.gif";
		}
	}
	for (var i = 1; i < 16; i++) {
		if (document.images['s' + i +'b1'].src != "https://www.apassion4jazz.net/images/vpcblack.gif") {
	  document.images['s' + i +'b1'].src = "https://www.apassion4jazz.net/images/vpcblack.gif";
	  document.images['s' + i +'b2'].src = "https://www.apassion4jazz.net/images/vpcblack.gif";
	  document.images['s' + i +'b3'].src = "https://www.apassion4jazz.net/images/vpcblack.gif";
		}
	}
  }
}
