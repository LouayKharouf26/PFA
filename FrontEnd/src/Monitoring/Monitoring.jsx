import React ,{useState,useEffect} from "react";
import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
function Monitoring()
{
    const { vmName } = useParams();
    const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1Mzk3MzA0LCJuYmYiOjE2ODUzOTczMDQsImV4cCI6MTY4NTQwMTg5NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVVCNUI2UTE3QnhzczFpL1kxdzZpd0RrdmVnNklFUlVWVnJzWWpUeEU5RzhPZ2lPQXNMYmo5amhkTU9ZODlZU3IiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTYuMjI5LjI0LjY5IiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiYmdmTDE4dnlzMHVOQkVvaVN0VVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.Ji1eAnQDNOr28NUnnd5KM1UvoKcuVoYkBiAi8dvINEi_MrNcDrCyIUBdHKjTswkLrSQAF5T4LDf4q7gR4TQ2I4WXTNIqQ8hZUuk5Aol_Gd6kqHjHk_HTAEyT5SL-G492HI8mAIZc4Fa9PRe2gLxtYTTSvcGR2eB8o2hZRgZm03fIinnD-d8pEujTsx1NmsmhPdVJ2OIzGPjq7C80hWxoxYc23_sjkSvewWxNJZoouGGVGNmJgHcXAVPdWjx55ZMigyFfRBiBib7MBbRJNFuv2DPdnCjF9CbidXL14s586hmzt8nVwjxKpGHo9bXNRX69DLa7oqNyHqjrCfGS3y0vmA';

    var apiResponse = [];
    //const [apiResponse, setApiResponse] = useState([]);
   
       setInterval(() => {
         fetchAPIresponse();
      }, 2000);

     
   
   
   const fetchAPIresponse=()=>{
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1Mzk3MzA0LCJuYmYiOjE2ODUzOTczMDQsImV4cCI6MTY4NTQwMTg5NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVVCNUI2UTE3QnhzczFpL1kxdzZpd0RrdmVnNklFUlVWVnJzWWpUeEU5RzhPZ2lPQXNMYmo5amhkTU9ZODlZU3IiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTYuMjI5LjI0LjY5IiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiYmdmTDE4dnlzMHVOQkVvaVN0VVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.Ji1eAnQDNOr28NUnnd5KM1UvoKcuVoYkBiAi8dvINEi_MrNcDrCyIUBdHKjTswkLrSQAF5T4LDf4q7gR4TQ2I4WXTNIqQ8hZUuk5Aol_Gd6kqHjHk_HTAEyT5SL-G492HI8mAIZc4Fa9PRe2gLxtYTTSvcGR2eB8o2hZRgZm03fIinnD-d8pEujTsx1NmsmhPdVJ2OIzGPjq7C80hWxoxYc23_sjkSvewWxNJZoouGGVGNmJgHcXAVPdWjx55ZMigyFfRBiBib7MBbRJNFuv2DPdnCjF9CbidXL14s586hmzt8nVwjxKpGHo9bXNRX69DLa7oqNyHqjrCfGS3y0vmA';
      const resourceGroupName = `${vmName}-resource-group`;
      const options = {
        headers: {
          Authorization: `Bearer ${azureAuthToken}`,
        },
      };
      
      fetch(
        `https://management.azure.com//subscriptions/94bdf75f-0db0-45e0-bb43-ff113d14ea1f/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}/providers/Microsoft.Insights/metrics?&metricnames=Percentage CPU,Network In,Network Out,Available Memory Bytes,CPU Credits Consumed,CPU Credits Remaining,Disk Read Bytes,Disk Write Bytes&api-version=2018-01-01`,
        options
      )
        .then((response) => response.json())
        .then((data) => {console.log(data)
            //setApiResponse(data);
            apiResponse=data;
          
        }
      )
        .catch((error) => console.log(error));
   
        console.log(apiResponse);
        (async function() {
          console.log(apiResponse.keys);
          const data = apiResponse.value[0].timeseries[0].data;

         
             new Chart(
               document.getElementById('acquisitions'),
               {
                 type: 'line',
                 options: {
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: 'CPU USAGE'
                      },
                    }},
                    interaction: {
                        intersect: false,
                      },
                 data: {
                   labels: data.map(row => row.timeStamp.substring(row.timeStamp.lastIndexOf("T")+1,row.timeStamp.length-1)),
                   datasets: [
                     {
                       label: 'Average by timestamp',
                       data: data.map(row => row.average)
                     }
                   ]
                 }
                 
               }

             );
           })();
           (async function() {
            console.log(apiResponse.keys);
            const data = apiResponse.value[3].timeseries[0].data;
  
           
               new Chart(
                 document.getElementById('acquisitions1'),
                 {
                   type: 'line',
                   options: {
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: 'Available Memory Bytes'
                        },
                      }},
                      interaction: {
                          intersect: false,
                        },
                   data: {
                     labels: data.map(row => row.timeStamp.substring(row.timeStamp.lastIndexOf("T")+1,row.timeStamp.length-1)),
                     datasets: [
                       {
                         label: 'Average by timestamp',
                         data: data.map(row => row.average)
                       }
                     ]
                   }
                   
                 }
  
               );
             })();
   };

   
   
   return(<>
    
    <div className="monitoring"><canvas id="acquisitions"></canvas></div>
    <div className="monitoring1"><canvas id="acquisitions1"></canvas></div>

   
    </>)
}
export default Monitoring