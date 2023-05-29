import React ,{useState,useEffect} from "react";
import Chart from 'chart.js/auto'
import { useParams } from 'react-router-dom';
function Monitoring()
{
    const { vmName } = useParams();
    const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzkxOTA4LCJuYmYiOjE2ODUzOTE5MDgsImV4cCI6MTY4NTM5NzExMiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVNRdHNxbDZsYnlEMWdHYWdHWHc0dkxPaHBlbmtYYzl4aExrcUFSWkZ6R0lmZDlFSVdmbUdHVXJFOTJWM0NLZWQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTYuMjI5LjI0LjY5IiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoialZ2QlhQUnVKa2liTjJqNGdhUm9BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.g1IHD2t1ubWep7PCwWfG6AFoVEyWE1HV7_QxgdJLYbaIGKMjDvP4Cm9NIJreUBWCAiI3iO4pFOS97je9-5hlg9uaq2PNqf3EQKpTduJ04fwaRi2dfrT5QabO0LksqhcjuKL1GWitEJ0mucjOxhutmY5d59tdOmn_koR6ntRhSxLID-IJyoU049o7n8PCbXFc8Izae5kRy1t_KtE8pSd2FEQTMc2MPyobeq4vAzgKb6oFCvrSGJQ6bBy7d13QCDPsLm8hYRKdm5Udm19tJhSUP4yGGa8xWRYWGQNq1JiXE35cUpPNaNtf7kjpZH-bCur_6ATBGQKbuVoGQaMuK7XQ1Q';

    var apiResponse = [];
    //const [apiResponse, setApiResponse] = useState([]);
   
       setInterval(() => {
         fetchAPIresponse();
      }, 2000);

     
   
   
   const fetchAPIresponse=()=>{
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzgzODM3LCJuYmYiOjE2ODUzODM4MzcsImV4cCI6MTY4NTM4ODU3MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWpYZjg0YTRRT2hITmU5eFRBNHlsZ1pUR1p1WGNPY3daUTRDUDFwWTh1TEE2RERlMlU0WmhuYnlPaUN1Q21vZTQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTcuMTYuMTY0LjExIiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiUy1kY21KUXp1VU9sdGFKSkprRkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.FQBSUgd-1FZwA221EriZUjX2I0zFSJodead0LB6vDxlx9lyJU0ClV1ez8yBzW17ReUNl2derCwK486o1E7p-O7LctrxcvU8--fbOq0eI1khEFtXOhJuHuorVqdrEjZrI37S2LizcPRGD-hroytpkb5RBXtPnW3m8kVSnicpK1e-9WbuC8HHbsB4bs1YQv4Vk680ncSrVmpTsA3k8LOcr_F487vRyafrTyQ1cIXAkWa5T7YsipHE40IQ5XHIKA2W-Vfc7noFNBuEYOFG179ATuCZn0FWKzzD1leiImqQFOybalzkgmYRkPH7nW9xmLxN9wIY1c_ZWFCu-hTJEKm3tjw';
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
                   labels: data.map(row => row.timeStamp),
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
                     labels: data.map(row => row.timeStamp),
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