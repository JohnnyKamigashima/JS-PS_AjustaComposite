#target photoshop

var docRef = app.activeDocument,
    wrongDie = ["TECH","Die","DIECUT","Dieline"],
    wrongWhite = ["White","Flexo White","White Flexo","Gravure White","White 1","White 2","White Gravure","FlexoWhite"];
    wrongSubstrato = ["substrato","substrate"];

docRef.changeMode(ChangeMode.MULTICHANNEL);

for(var y=0;y<docRef.channels.length;y++){
    var upperName=docRef.channels[y].name,
        channelRef = docRef.channels[y];
    upperName=upperName.toUpperCase();

    for(var x=0;x<wrongSubstrato.length;x++){ //Delete old substrate
      var upperSubstrato=wrongSubstrato[x];
      //upperSubstrato=upperSubstrato.toUpperCase();
      if(upperSubstrato.toUpperCase()==upperName){channelRef.remove();        }
    }

    for(var x=0;x<wrongDie.length;x++){
      var upperDie=wrongDie[x];
      //upperDie=upperDie.toUpperCase();
      if(upperDie.toUpperCase()==upperName){changeColor(channelRef.name,0,0,0,20,0);}
      }

    for(var x=0;x<wrongWhite.length;x++){
      var upperWhite=wrongWhite[x];
      //upperWhite=upperWhite.toUpperCase();
      if(upperWhite.toUpperCase()==upperName){
     ChnlMove(channelRef.name,1); //Push white to first Channel
     changeColor(channelRef.name,0,0,0,0,100); //Change white to white
     newChannel("Substrato"); //Create gray substrate
    ChnlMove("Substrato",1); //Move substrate to first
    changeColor("Black",0,0,0,80,0); //Set black to 80%
     }
}
   }


allChannelsVisible();
/*
var techChannel = docRef.channels.getByName(techReplace), //select tech and change to 0 opacity and light gray
techColor = new SolidColor;
techColor.gray.gray = 20;
techChannel.color = techColor;
techChannel.opacity=0;

var blackChannel = docRef.channels.getByName("Black"), //select Black and change to 80% black
blackColor = new SolidColor;
blackColor.cmyk.black = 80;
//blackColor.cmyk.cyan = 20;
blackChannel.color = blackColor;
*/


function changeColor(channelName,cyan,magenta,yellow,black,opacity){
  var newChannel = app.activeDocument.channels.getByName(channelName),
  newColor = new SolidColor;
  newColor.cmyk.cyan=cyan;
  newColor.cmyk.magenta=magenta;
  newColor.cmyk.yellow=yellow;
  newColor.cmyk.black = black;
  newChannel.color = newColor;
  newChannel.opacity=opacity;
}

function newChannel(chanName){
  var docc=app.activeDocument;
  var nc = docc.channels.add();
  nc.kind = ChannelType.SPOTCOLOR;
  nc.opacity = 0;
  var newColor = new SolidColor;
  newColor.gray.gray = 60;
  nc.color = newColor;
  nc.name=chanName;
  docc.selection.fill(newColor);
}

function ChnlMove(channel,index) {
  var docRef=app.activeDocument;
  theChannels = new Array(docRef.channels.getByName(channel)); //select current channel
  docRef.activeChannels=theChannels;

  var idmove = charIDToTypeID("move");
  var desc7 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref1 = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");
  var idOrdn = charIDToTypeID("Ordn");
  var idTrgt = charIDToTypeID("Trgt");

  ref1.putEnumerated(idChnl, idOrdn, idTrgt);
  desc7.putReference(idnull, ref1);
  var idT = charIDToTypeID("T   ");
  var ref2 = new ActionReference();
  var idChnl = charIDToTypeID("Chnl");

  ref2.putIndex(idChnl, index);
  desc7.putReference(idT, ref2);
  executeAction(idmove, desc7, DialogModes.NO);
}

function allChannelsVisible (){
  var docRef = app.activeDocument;

  for (var i = 0; i < docRef.channels.length; i++) {
    docRef.channels[i].visible=true;
  }
}
