name := "Devoir2_BDD"

version := "0.1"

scalaVersion := "2.11.8"

updateOptions := updateOptions.value.withCachedResolution(true)

libraryDependencies += "org.apache.spark" %% "spark-sql" % "2.4.3"
libraryDependencies += "org.apache.spark" %% "spark-graphx" % "2.4.3"

//mainClass in assembly := Some("ca.lif.sparklauncher.app.Application")
mainClass in assembly := Some("cmdline.MainConsole")

assemblyMergeStrategy in assembly := {
  case PathList("META-INF", xs @ _*) => MergeStrategy.discard
  case x => MergeStrategy.first
}