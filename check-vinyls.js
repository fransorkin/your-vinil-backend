require("dotenv").config();
require("./db");

const Vinyl = require("./models/Vinyl.model");

setTimeout(async () => {
  try {
    const counts = await Vinyl.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log("\n📊 Vinilos por género en la base de datos:");
    counts.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });
    
    const total = await Vinyl.countDocuments();
    console.log(`\n✅ Total: ${total} vinilos\n`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}, 2000);
