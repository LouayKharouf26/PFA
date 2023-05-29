import './Dashboard.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Sidebar()
{   const navigate = useNavigate();
    const [rgs, setRgs] = useState([]);
    const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1Mzk3MzA0LCJuYmYiOjE2ODUzOTczMDQsImV4cCI6MTY4NTQwMTg5NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVVCNUI2UTE3QnhzczFpL1kxdzZpd0RrdmVnNklFUlVWVnJzWWpUeEU5RzhPZ2lPQXNMYmo5amhkTU9ZODlZU3IiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTYuMjI5LjI0LjY5IiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiYmdmTDE4dnlzMHVOQkVvaVN0VVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.Ji1eAnQDNOr28NUnnd5KM1UvoKcuVoYkBiAi8dvINEi_MrNcDrCyIUBdHKjTswkLrSQAF5T4LDf4q7gR4TQ2I4WXTNIqQ8hZUuk5Aol_Gd6kqHjHk_HTAEyT5SL-G492HI8mAIZc4Fa9PRe2gLxtYTTSvcGR2eB8o2hZRgZm03fIinnD-d8pEujTsx1NmsmhPdVJ2OIzGPjq7C80hWxoxYc23_sjkSvewWxNJZoouGGVGNmJgHcXAVPdWjx55ZMigyFfRBiBib7MBbRJNFuv2DPdnCjF9CbidXL14s586hmzt8nVwjxKpGHo9bXNRX69DLa7oqNyHqjrCfGS3y0vmA';
    const [vms,setVms] = useState([]);
    const handleVmClick = (vmName) => {
        navigate(`/vms/${vmName}`);
      };
      const extractVmName = (resourceGroupName) => {
        return resourceGroupName.substring(0, resourceGroupName.lastIndexOf("-resource-group"));
      };
    useEffect(() => {
      const subscriptionId = '94bdf75f-0db0-45e0-bb43-ff113d14ea1f';
      //const resourceGroupName = 'pfa';
      const apiVersion = '2021-04-01';
      const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups?api-version=${apiVersion}`;
            const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${azureAuthToken}`,
          'Content-Type': 'application/json'
        }
      };
  
      fetch(apiEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          setRgs(data.value|| []);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    useEffect(() => {
      const subscriptionId = '94bdf75f-0db0-45e0-bb43-ff113d14ea1f';
     // const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzgzODM3LCJuYmYiOjE2ODUzODM4MzcsImV4cCI6MTY4NTM4ODU3MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWpYZjg0YTRRT2hITmU5eFRBNHlsZ1pUR1p1WGNPY3daUTRDUDFwWTh1TEE2RERlMlU0WmhuYnlPaUN1Q21vZTQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTcuMTYuMTY0LjExIiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiUy1kY21KUXp1VU9sdGFKSkprRkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.FQBSUgd-1FZwA221EriZUjX2I0zFSJodead0LB6vDxlx9lyJU0ClV1ez8yBzW17ReUNl2derCwK486o1E7p-O7LctrxcvU8--fbOq0eI1khEFtXOhJuHuorVqdrEjZrI37S2LizcPRGD-hroytpkb5RBXtPnW3m8kVSnicpK1e-9WbuC8HHbsB4bs1YQv4Vk680ncSrVmpTsA3k8LOcr_F487vRyafrTyQ1cIXAkWa5T7YsipHE40IQ5XHIKA2W-Vfc7noFNBuEYOFG179ATuCZn0FWKzzD1leiImqQFOybalzkgmYRkPH7nW9xmLxN9wIY1c_ZWFCu-hTJEKm3tjw';
      const apiVersion = '2021-04-01';

      //const resourceGroupName = 'pfa';
      rgs.forEach(rg =>{
        const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${rg.name}/providers/Microsoft.Compute/virtualMachines?api-version=${apiVersion}`;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${azureAuthToken}`,
            'Content-Type': 'application/json'
          }
        };
        fetch(apiEndpoint, requestOptions)
        .then(response => response.json())
        .then(data => {
          setVms(data.value|| []);
        })
        .catch(error => {
          console.error(error);
        });
      })
    }, []);
    return(
        <>
<aside id="sidebar" class="sidebar">

<ul class="sidebar-nav" id="sidebar-nav">

  <li class="nav-item">
    <a class="nav-link " href="/Dashboard">
      <i class="bi bi-grid"></i>
      <span>Dashboard</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
      <i class="bi bi-menu-button-wide"></i><span>VM list</span><i class="bi bi-chevron-down ms-auto"></i>
    </a>
    
    <ul id="components-nav" class="nav-content  " data-bs-parent="#sidebar-nav">
      <li>
        <a href="components-alerts.html">
          <i class="bi bi-circle"></i><span></span>
        </a>
      </li>
 
      {rgs.map(rg => (
          <div key={rg.id} >
            <ul>
              <li className="container" >
                <div className="details">
                  <div class="row align-items-start ligne1">
                    <div class="col ">
                    <a href="#" onClick={() => handleVmClick(extractVmName(rg.name))}>
                    <i></i><span>{extractVmName(rg.name)}</span>
                    
            </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))}
    
   
     
     
      
      
      
    </ul>
  </li>


  



 
 

</ul>

</aside>
        </>
    )
}
export default Sidebar