#!/usr/bin/env node

var models = require("./lib/server-models");
var UnhangoutDb = require("./lib/unhangout-db");
var Promise = require("bluebird");
var options = require("./lib/options");

var EVENT_DETAILS = {
  id: {{unhangout_event.id}},
  title: "{{unhangout_event.title}}",
  shortName: "{{unhangout_event.shortName}}",
  organizer: "{{unhangout_event.organizer}}",
  description: "{{unhangout_event.description|e}}",
  whiteboard: {message: "{{unhangout_event.whiteboardMessage}}"},
  open: {{unhangout_event.open}},
  sessionsOpen: {{unhangout_event.sessionsOpen}},
  iframeEmbedCode: '{{unhangout_event.iframeEmbedCode}}',
  dateAndTime: "{{unhangout_event.dateAndTime}}",
  timeZoneValue: "{{unhangout_event.timeZoneValue}}",
  admins: [
  {% for admin in unhangout_event.admins %}
    {'email': "{{admin}}"},
  {% endfor %}
  ]
};

var USER_DETAILS = {
  id: "{{unhangout_farmer.id}}",
  displayName: "{{unhangout_farmer.displayName}}",
  emails: [{value: "{{unhangout_farmer.email}}"}],
  perms: {"farmHangouts": true},
}


function main() {
  return new Promise(function(resolve, reject) {
    // Initialize database
    db = new UnhangoutDb(options);
    db.init(function() {
      resolve(db);
    });
  }).then(function(db) {
    // Fetch existing event.
    var event = db.events.findWhere({shortName: EVENT_DETAILS.shortName});
    if (!event) {
      event = new models.ServerEvent();
    }
    // Set event details
    event.set(EVENT_DETAILS);
    return new Promise(function(resolve, reject) {
      if (!event.hasChanged()) {
        return resolve(false);
      }
      event.save({}, {
        success: function() { resolve(true); },
        error: reject
      });
    }).then(function(changed) {
      var user = db.users.findWhere({id: USER_DETAILS.id});
      if (!user) {
        user = new models.ServerUser();
      }
      user.set(USER_DETAILS)
      if (user.hasChanged()) {
        return new Promise(function(resolve, reject) {
          user.save({}, {
            success: function() { resolve(true); },
            error: reject
          });
        });
      } else {
        return changed;
      }
    });
  }).then(function(changed) {
    if (changed) {
      console.log("changed");
    } else {
      console.log("ok");
    }
    process.exit(0);
  }).catch(function(err) {
    console.error(err);
    process.exit(1);
  });
}

if (require.main === module) {
  main();
}
