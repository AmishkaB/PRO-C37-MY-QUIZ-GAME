class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background('black');
    
    //write code to show a heading for showing the result of Quiz
    textSize(45)
    fill('magenta')
    text('Result of the Quiz!!',260,65);

    //call getContestantInfo( ) here
     Contestant.getPlayerInfo()
     

    //write condition to check if contestantInfor is not undefined
    if(allContestants !==undefined){
      var display_position=130;
      fill('cyan');
      textSize(26);
      text('NOTE:Contestant who answered correctly are highlighted in green color!',10,230);
      for(var plr in allContestants){ //for(var a in var)
        var correctAns = '2';
        if(correctAns === allContestants[plr].answer)
          fill('lawnGreen')
        else
          fill('pink');
        
        display_position += 30
        textSize(30)
        text(allContestants[plr].name+': '+allContestants[plr].answer,390,display_position)

      }
    }
    
  }

}
