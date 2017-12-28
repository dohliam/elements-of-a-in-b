function find_el() {
  var cola = document.getElementById("cola");
  var colb = document.getElementById("colb");
  var result = document.getElementById("result");
  var msg = document.getElementById("msg");
  var rea = document.getElementById("rea");
  var reb = document.getElementById("reb");

  var a_lines = cola.value.split("\n");
  var b_lines = colb.value.split("\n");
  var a_values = [];
  var b_matches = [];

  for (i = 0; i < a_lines.length; i++) {
    l = a_lines[i];
    re = new RegExp(rea.value);
    m = l.match(re);
    if (m != null) {
      if (m[1]) {
        a_values.push(m[1]);
      } else {
        a_values.push(m[0]);
      } 
    }
  }

  for (i = 0; i < b_lines.length; i++) {
    l = b_lines[i];
    re = new RegExp(reb.value);
    m = l.match(re);
    if (m != null) {
      if (m[1]) {
        for (j = 0; j < a_values.length; j++) {
          key = a_values[j];
          if (m[1] == key) {
            b_matches.push(l);
          }
        }
      } else {
        for (j = 0; j < a_values.length; j++) {
          key = a_values[j];
          if (m[0] == key) {
            b_matches.push(l);
          }
        }
      } 
    }
  }

  result.value = uniq(b_matches).join("\n");
  msg.style.display = "";
  msg.innerHTML = "<p>Total number of matches found: " + uniq(b_matches).length + "</p>";

}

function uniq(a) {
  tmp = new Array(0);
  for(i=0;i<a.length;i++) {
    if(!contains(tmp, a[i])) {
      tmp.length+=1;
      tmp[tmp.length-1]=a[i];
    }
  }
  return tmp;
}

function contains(a, e) {
  for(j=0;j<a.length;j++)if(a[j]==e)return true;
  return false;
}

function toggle_options() {
  options = document.getElementById("options_div");
  if (options.style.display != "none") {
    options.style.display = "none";
  } else {
    options.style.display = "";
  }
}

function dict_lookup() {
  var cola = document.getElementById("cola");
  var colb = document.getElementById("colb");
  var result = document.getElementById("result");
  var msg = document.getElementById("msg");
  var listd = document.getElementById("listd").value;
  var outd = document.getElementById("outd").value;

  var a_lines = cola.value.split("\n");
  var b_lines = colb.value.split("\n");
  var a_values = [];
  var b_matches = [];

  collector = colb.value;

  result.value = "";

  for (i = 0; i < a_lines.length; i++) {
    l = a_lines[i];
    re = new RegExp("(.*)" + listd + "(.*)");
    m = l.match(re);

    if (m == null) {
      continue;
    }

    if (outd == "\\t") {
      outd = "\t";
    }

    if (m.length == 3) {
      test1 = m[1];
      test2 = m[2];
      result_regex = new RegExp("^" + test1 + "$", "gm");

      collector = collector.replace(result_regex, test1 + outd + test2);
    }
  }
  result.value = collector;
}

function toggle_mode() {
  if (window.dictmode.checked) {
    window.cola.setAttribute("onkeyup", "dict_lookup()");
    window.colb.setAttribute("onkeyup", "dict_lookup()");
    window.findbtn.setAttribute("onclick", "dict_lookup()");
    window.findbtn.value = "Find matching items from list";
    window.regopts.style.display = "none";
    window.msg.style.display = "none";
    window.dictopts.style.display = "";
  } else {
    window.cola.setAttribute("onkeyup", "find_el()");
    window.colb.setAttribute("onkeyup", "find_el()");
    window.findbtn.setAttribute("onclick", "find_el()");
    window.dictopts.style.display = "none";
    window.regopts.style.display = "";
    window.msg.style.display = "";
  }
}
