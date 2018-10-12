curl --proxy https://42.112.209.164:8080 -o /dev/null -s -w
'namelookup:%{time_namelookup}s\n
statusCode:%{http_code}s\n
connect:  %{time_connect}\n
appconnect:  %{time_appconnect}s\n
pretransfer:  %{time_pretransfer}s\n
redirect:  %{time_redirect}s\n
starttransfer:  %{time_starttransfer}s\n
total:  %{time_total}s\n'  https://www.google.com