import org.apache.spark.{SparkConf, SparkContext}
import org.apache.spark.sql.{Row, SparkSession, functions}
import org.apache.spark.sql.functions._

import scala.collection.mutable


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
 // monsters.show();
val viewExploded= monsters.withColumn("spells", explode($"spells"))
  var view = viewExploded.groupBy("spells").agg(functions.collect_set("name") as "monsters");





  view.foreach { row =>
    row.toSeq.foreach{col => println(col) }
  }

 // view.rdd.map(x => x.mkString(",")).saveAsTextFile("./src/main/crawler/data.txt")
}