module.exports = {
  shouldNotReadFromRef: function (ref, done) {
    ref.once('value', function () {
      done(new Error('Should have not allowed read'));
    }, function (err) {
      if (err.code === 'PERMISSION_DENIED') {
        done();
      } else {
        console.log(err);
        done(new Error('Should have thrown a PERMISSION_DENIED error'));
      }
    });
  },
  shouldNotWriteToRef: function (ref, done, obj) {
    var objectToWrite = {test: true};
    if (obj) {
      objectToWrite = obj;
    }
    ref.update(objectToWrite, function (err) {
      if (!err) {
        done(new Error('Should have thrown an error on write'));
      } else if (err.code !== 'PERMISSION_DENIED') {
        done(new Error('Should have thrown a PERMISSION_DENIED error'));
      } else {
        done();
      }
    });
  },
  shouldReadFromRef: function (ref, done) {
    ref.once('value', function () {
      done();
    }, function (err) {
      console.log(err);
      done(new Error('Should have allowed read'));
    });
  },
  shouldWriteToRef: function (ref, done, obj) {
    var objectToWrite = {test: true};
    if (obj) {
      objectToWrite = obj;
    }
    ref.update(objectToWrite, function (err) {
      if (err) {
        done(new Error('Should have allowed write to ref'));
      } else {
        done();
      }
    });
  }
};
