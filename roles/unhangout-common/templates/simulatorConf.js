// This file is javascript so we can have comments, but the semantics are JSON.
module.exports = {
    "CLIENT": {
        // The URL for the server we will be hammering.
        "SERVER_URL": "{{unhangout_domain}}",
        // The range of user IDs for this client to use.  If you're using
        // multiple machines to load test the server, you may want to set each
        // one to a different subset of the range, so that you get different
        // users.
        "USER_RANGE": [{{loadtester_user_range_low}}, {{loadtester_user_range_high}}],
        // The range of sessions our users will attempt to join.  There may be
        // more sessions available on the server for users to join -- reducing
        // the range ensures that sessions fill up.
        "SESSION_RANGE": [{{loadtester_session_range_low}}, {{loadtester_session_range_high}}],
        // Disable sending of blur/focus socket traffic?
        "DISABLE_BLUR": false,
        // Disable sending of chat traffic?
        "DISABLE_CHAT": false,
        // Disable session joining and leaving? (If you can't join, you can't leave).
        "DISABLE_SESSION_JOINING": false,
        // Disable session leaving?  (You can checkout any time you like, but...)
        "DISABLE_SESSION_LEAVING": false,
        // Disable leaving the event?
        "DISABLE_EVENT_LEAVING": false,
        // The ID for the event on the server which contains the load simulator
        // sessions, generated with ``bin/prepare-load-simulator-data.js``.
        "EVENT_ID": {{loadtester_event_id}},
        // Tell node to ignore self-signed certificates, in case the server
        // uses one by setting this to "0".  To validate certificates, set it
        // to "1".
        "NODE_TLS_REJECT_UNAUTHORIZED": "0",
        // The session secret used by the server we're attacking.  We need this
        // in order to authenticate the sockets we're hammering it with.  Keep
        // this value private.
        "UNHANGOUT_SESSION_SECRET": "{{unhangout_session_secret}}"
    },
    "SERVER": {
        // The ID of the event in which to generate sessions.
        "EVENT_ID": {{loadtester_event_id}},
        // The range of session IDs to generate. in that event.
        "SESSION_RANGE": [{{loadtester_session_range_low}}, {{loadtester_session_range_high}}],
        // The range of users to generate.
        "USER_RANGE": [{{loadtester_user_range_low}}, {{loadtester_user_range_high}}],
        // The REDIS DB to use when generating.  This should be the same as the
        // setting in conf'json's UNHANGOUT_REDIS_DB when load testing is in
        // progress.  The default production value is 0 and test DB is 1.
        "REDIS_DB_ID": {{loadtester_redis_db_id}}
    }
}
