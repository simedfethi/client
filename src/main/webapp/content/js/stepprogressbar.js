function Stepprogressbar() {
  var stepindex = 0;
  var currentelement;
  var firstclass;
  var listSnapshot = [];
  const colortab = ['blue', 'green', 'orange', 'vert', 'orange', 'vert'];
  this.setStep = function (step) {
    stepindex = step;
    listSnapshot = [];
    this.onloadStep();
  };
  this.getStep = function () {
    return stepindex;
  };

  let ek = document.querySelectorAll('.step-li');
  var arr = Array.prototype.slice.call(ek);

  this.onloadStep= function() {
    ek = document.querySelectorAll('.step-li');

    var currentindex = stepindex;
    var i = 0;
    ek.forEach(divi => {
      if (arr.indexOf(divi) <= currentindex) {
        divi.className = '';
        divi.classList.add('step-li');
        divi.classList.add(colortab[currentindex]);
      }
      listSnapshot[i] = divi.classList.value;
      i++;
    });
  }

  ek.forEach(div => {
    div.addEventListener('mouseenter', e => {
      var currentindex = arr.indexOf(e.target);
      stepindex + currentindex;
      ek.forEach(divi => {
        if (arr.indexOf(divi) <= currentindex) {
          if (divi.classList[1]) {
            firstclass = divi.classList[1];
          }
          divi.className = '';
          divi.classList.add('step-li');
          divi.classList.add(colortab[currentindex]);
        }
      });
    });
    div.addEventListener('click', e => {
      currentelement = e.target;
      currentindex = arr.indexOf(e.target);
      stepindex = currentindex;
      var i = 0;
      ek.forEach(divi => {
        if (arr.indexOf(divi) > currentindex) {
          divi.className = '';
          divi.classList.add('step-li');
        }
        if (arr.indexOf(divi) <= currentindex) {
          divi.className = '';
          divi.classList.add('step-li');
          divi.classList.add(colortab[currentindex]);
        }
        listSnapshot[i] = divi.classList.value;
        i++;
      });
      this.getStep();
    });
    div.addEventListener('mouseleave', e => {
      currentindex = arr.indexOf(e.target);
      stepindex = currentindex;
      var i = 0;
      ek.forEach(divi => {
        divi.className = listSnapshot[i];
        i++;
      });
    });
  });
}
