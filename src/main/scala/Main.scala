import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.{Row, SparkSession}
import org.apache.spark.rdd.RDD

object Main extends App {
  val conf = new SparkConf()
    .setAppName("Spark devoir 2")
    .setMaster("local[*]")

  val sc = new SparkContext(conf)
  sc.setLogLevel("ERROR")

  val spark = SparkSession
    .builder()
    .config(conf)
    .getOrCreate()

  import spark.implicits._
  val path = "./src/main/crawler/data.json"
  val monsters = spark.read.json(path)

  // The inferred schema can be visualized using the printSchema() method
  //monsters.show();
val monstersRDD : RDD[Row]=monsters.rdd
 monstersRDD.take(5).foreach(println)

  val batchViewSpellMonsters = monstersRDD.flatMap(monster=>
    monster.spells.map(spell => (spell, monster.name))
  ).groupByKey()


}