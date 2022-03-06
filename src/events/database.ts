import ClientEvent from "@util/ClientEvent";
import SQLite  from "better-sqlite3";
import econdata from '../util/Database/level.sqlite';


export default new ClientEvent("ready", async function() {
    const ecosql = new SQLite(econdata);
    const table = ecosql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();

    if (!table['count(*)']) {
        ecosql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
        ecosql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        ecosql.pragma("synchronous = 1");
        ecosql.pragma("journal_mode = wal");
    }
});