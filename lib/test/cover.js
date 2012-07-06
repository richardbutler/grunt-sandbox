var Reporter = function(object){
  this.object = object;

  this.error = 0;
  this.pass  = 0;
  this.total = 0;
};
Reporter.prototype.report = function(){
  var result = '';
  for (var file in this.object){

    var fileReporter = new FileReporter(this.object[file], '<<<', '>>>');

    var fileReport = fileReporter.report();
    var percentage = fileReporter.pass / fileReporter.total * 100;

    this.error += fileReporter.error;
    this.pass  += fileReporter.pass;
    this.total += fileReporter.total;

    result += '+++  ' + result + ' (' + Math.round(percentage) + ') +++ \n\n';
    result += fileReport;
    result += '\n\n\n\n';
  }
  return result;
}

var FileReporter = function(object, open, close){
  this.object = object;
  this.open   = open;
  this.close  = close;

  this.error = 0;
  this.pass  = 0;
  this.total = 0;
};

FileReporter.prototype.substitute = function(string, object){
  return string.replace(/\\?\{([^{}]+)\}/g, function(match, name){
    if (match.charAt(0) == '\\') return match.slice(1);
    return (object[name] !== null) ? object[name] : '';
  });
};

FileReporter.prototype.generateOpen = function(count){
  return this.substitute(this.open, {
    count: count
  });
};

FileReporter.prototype.generateClose = function(count){
  return this.substitute(this.close, {
    count: count
  });
};

FileReporter.prototype.report = function(){

  var i, l, k;

  var code = this.object.__code;

  // generate array of all tokens
  var codez = [];
  for (i = 0, l = code.length; i < l; i++){
    codez.push({
      pos: i,
      value: code.slice(i, i + 1)
    });
  }

  // insert new strings that wrap the statements
  for (k in this.object){
    if (k == '__code') continue;

    var count = this.object[k];
    var range = k.split(':');

    this.total++;
    if (count) this.pass++;
    else this.error++;

    for (i = 0, l = codez.length; i < l; i++){

      if (codez[i].pos == range[0]){
        codez.splice(i, 0, {
          pos: -1,
          value: this.generateOpen(count)
        });
        i++;
        continue;
      }

      if (codez[i].pos == range[1]){
        codez.splice(i + 1, 0, {
          pos: -1,
          value: this.generateClose(count)
        });
        i++;
        continue;
      }

    }

  }

  var result = '';
  for (i = 0, l = codez.length; i < l; i++){
    result += codez[i].value;
  }

  return result;

}

var HTMLReporter = function(object){
  Reporter.apply(this, arguments);

  // TODO would be cool to use some nicer templating solution for this
  this.head = '' +
    '<!DOCTYPE html>\n' +
    '<html>\n<head>\n' +
    '<meta charset="utf-8">\n' +
    '<title>Coverate Results</title>\n' +
    '<style>\n' +
    ' .error { background: #F8D5D8 }\n' +
    ' .count { font-weight: bold; border-radius: 3px }\n' +
    ' .pass .count { background: #BFFFBF;}' +
    ' .error .count { background: #F8D5D8; color: red}' +
    '</style>\n' +
    '</head>\n<body>\n';

  this.tail = '\n</body>\n</html>';

};
HTMLReporter.prototype = new Reporter();
HTMLReporter.prototype.report = function(){

  var result = this.head;

  for (var file in this.object){
    var fileReporter = new HTMLFileReporter(this.object[file]);

    var fileReport = fileReporter.report();
    var percentage = fileReporter.pass / fileReporter.total * 100;

    this.error += fileReporter.error;
    this.pass  += fileReporter.pass;
    this.total += fileReporter.total;

    result += '<h1>' + file + ' (' + Math.round(percentage) + '%)</h1>\n\n';
    result += '<pre>' + fileReport + '</pre>';
  }

  return result + this.tail;

}

var HTMLFileReporter = function(object){

  var open  = '<span class="{class}" data-count="{count}"><span class="count">{count}</span>';
  var close = '</span>';

  FileReporter.call( this, object, open, close );

};
HTMLFileReporter.prototype = new FileReporter();
HTMLFileReporter.prototype.generateOpen = function(count){
  return this.substitute(this.open, {
    'count': count,
    'class': count ? 'pass' : 'error'
  });
}