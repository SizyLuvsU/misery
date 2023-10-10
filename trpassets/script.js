var titles = ["> K̴̞͑̿͆͜i̴͕̻̘̿̾͝l̸͖͕͌̽͝l̸͇͉̈́̽̚ y̴͕͕͍͆̿o̵͚͔͋̿̚͜u̴͍͎̙̒͐̓r̵͕͙̟͒̾͝ s̴̢̝̻͛͐͊e̵͚͙̝̿͑̀l̴̡̟̝͊̈́̚f̴̦̠̻̽̔͘ <", "> P̴̟͎̝̓͛͝o̸͇͍̓͒͘l̸͉̼̀̈́͛͜i̸͍̼̼̽͋͐i̵̙̟̠͊͌̓s̵̡̻͙̈́͛̈́ì̴͓͔͌͘.̸͕͔̓̿̓͜f̵͓̠͌͌͠ḯ̴͖̪͍͝͝  <", "> m̸͕͖͕̈́͑͘i̵̢͍͐̓̀s̴͚̟͉̕͠e̴͔͉̾̽͝r̵̡̺̝͛͑͊y̸̢̪͌͌̾  <", "> F̸͚͍̟͌̾͘a̸̘͖͖͒̓͒g̴̙͇͙͛͐͊ǵ̵̢͎͙̈́̔o̵͓̼̝͒̾̕t̵͇͓͋͐́͜ <", "> N̴̫̦̝̐̓̿í̸̢̻̀̚g̸͓͎͎̐̽͝g̴̢̟̠͊͐̚a̴̝̪͎̓̾͝ m̸͇͍͒͋́o̵̠̦͚͌͊͠n̵̞̙̠̒̽k̴͍̻̻͐͌̔e̴̞͉͉͊͌͋ỳ̵͙̝͘͠ <"]; // an array of different titles
var titleIndex = 0; // an index to keep track of the current title

// function to change the page title
function changeTitle() {
  document.title = titles[titleIndex]; // set the new title
  titleIndex++; // increment the title index
  if (titleIndex >= titles.length) { // if we've reached the end of the array
    titleIndex = 0; // start over from the beginning
  }
}

// call the changeTitle() function every 3 seconds
setInterval(changeTitle, 500);
