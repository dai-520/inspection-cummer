echo off
chcp 65001
cd /d %~dp0
set CURRENTT_DIR=%cd%

echo "------------------------开始安装点检系统相关服务..."

echo "开始安装定时调度服务..."
nssm.exe install rms-consumer%CURRENTT_DIR%/rms-inspection.bat
echo "完成安装定时调度服务!!!"

echo "------------------------开始启动服务..."
net start rms-consumer
echo "------------------------完成启动服务!!!"
pause