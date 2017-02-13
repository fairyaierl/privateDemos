#!/bin/bash

dir=$(dirname $0)/dest/
package=com.miui.player
remote=/data/data/$package/cache/static
webcache=/data/data/$package/app_webview/

cd $dir

adb shell am force-stop $package
#adb shell pm clear $package
adb shell rm -r $webcache
adb shell rm -r $remote
adb shell mkdir -p $remote

for f in index.* frameconfig.json; do
  adb push $f $remote;
done;

for dir in lang img; do
  adb shell mkdir -p $remote/$dir;
  for f in $dir/*; do
    #echo $f $remot $dir;
    adb push $f $remote/$dir;
  done;
done;

adb shell am start -a android.intent.action.VIEW -d miui-music://home
