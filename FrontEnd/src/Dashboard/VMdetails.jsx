
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardNavbar from './DashboardNavbar';
import Sidebar from './Sidebar';
import './Dashboard.css'
import Monitoring from '../Monitoring/Monitoring';
import { useNavigate } from "react-router-dom";
function VMdetails() {
  const navigate = useNavigate();
  const [variable, setVariable] = useState('');
  const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1Mzk3MzA0LCJuYmYiOjE2ODUzOTczMDQsImV4cCI6MTY4NTQwMTg5NSwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQVVCNUI2UTE3QnhzczFpL1kxdzZpd0RrdmVnNklFUlVWVnJzWWpUeEU5RzhPZ2lPQXNMYmo5amhkTU9ZODlZU3IiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTYuMjI5LjI0LjY5IiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiYmdmTDE4dnlzMHVOQkVvaVN0VVRBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.Ji1eAnQDNOr28NUnnd5KM1UvoKcuVoYkBiAi8dvINEi_MrNcDrCyIUBdHKjTswkLrSQAF5T4LDf4q7gR4TQ2I4WXTNIqQ8hZUuk5Aol_Gd6kqHjHk_HTAEyT5SL-G492HI8mAIZc4Fa9PRe2gLxtYTTSvcGR2eB8o2hZRgZm03fIinnD-d8pEujTsx1NmsmhPdVJ2OIzGPjq7C80hWxoxYc23_sjkSvewWxNJZoouGGVGNmJgHcXAVPdWjx55ZMigyFfRBiBib7MBbRJNFuv2DPdnCjF9CbidXL14s586hmzt8nVwjxKpGHo9bXNRX69DLa7oqNyHqjrCfGS3y0vmA';

  /*const handleClick = (name) => {
    setVariable(name);
  };*/
  const { vmName } = useParams();
  const [vmDetails, setVmDetails] = useState([]);
  const [osType, setOsType] = useState([]);
  const [IPpublic,setIPpublic]=useState([]);
  useEffect(() => {
    fetchVmDetails(vmName);
    
  }, [vmName]);
  useEffect(() => {
    fetchIPpublic();
   /* const interval = setInterval(() => {
      fetchIPpublic();
    }, 2000);*/
  });

  const fetchVmDetails = (vmName) => {
    const subscriptionId = '94bdf75f-0db0-45e0-bb43-ff113d14ea1f';
    const resourceGroupName = `${vmName}-resource-group`;
    console.log(resourceGroupName)
    const apiVersion = '2021-03-01';
    const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}?api-version=${apiVersion}`;
   // const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzgzODM3LCJuYmYiOjE2ODUzODM4MzcsImV4cCI6MTY4NTM4ODU3MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWpYZjg0YTRRT2hITmU5eFRBNHlsZ1pUR1p1WGNPY3daUTRDUDFwWTh1TEE2RERlMlU0WmhuYnlPaUN1Q21vZTQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTcuMTYuMTY0LjExIiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiUy1kY21KUXp1VU9sdGFKSkprRkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.FQBSUgd-1FZwA221EriZUjX2I0zFSJodead0LB6vDxlx9lyJU0ClV1ez8yBzW17ReUNl2derCwK486o1E7p-O7LctrxcvU8--fbOq0eI1khEFtXOhJuHuorVqdrEjZrI37S2LizcPRGD-hroytpkb5RBXtPnW3m8kVSnicpK1e-9WbuC8HHbsB4bs1YQv4Vk680ncSrVmpTsA3k8LOcr_F487vRyafrTyQ1cIXAkWa5T7YsipHE40IQ5XHIKA2W-Vfc7noFNBuEYOFG179ATuCZn0FWKzzD1leiImqQFOybalzkgmYRkPH7nW9xmLxN9wIY1c_ZWFCu-hTJEKm3tjw';
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
        setVmDetails(data);
        const osType1 = data.properties.storageProfile.osDisk.osType;
        console.log(osType1);
        setOsType(data.properties.storageProfile.osDisk.osType);
        
      })
      
      .catch(error => {
        console.error(error);
      });
    
  };  console.log(osType)

  const fetchIPpublic = () => {
    const subscriptionId = '94bdf75f-0db0-45e0-bb43-ff113d14ea1f';
    const resourceGroupName = `${vmName}-resource-group`;
    console.log(resourceGroupName)
    const apiVersion = '2022-11-01';
    const apiEndpoint = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/publicIPAddresses?api-version=${apiVersion}`;
   // const azureAuthToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuY29yZS53aW5kb3dzLm5ldC8iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEvIiwiaWF0IjoxNjg1MzgzODM3LCJuYmYiOjE2ODUzODM4MzcsImV4cCI6MTY4NTM4ODU3MywiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhUQUFBQWpYZjg0YTRRT2hITmU5eFRBNHlsZ1pUR1p1WGNPY3daUTRDUDFwWTh1TEE2RERlMlU0WmhuYnlPaUN1Q21vZTQiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMDRiMDc3OTUtOGRkYi00NjFhLWJiZWUtMDJmOWUxYmY3YjQ2IiwiYXBwaWRhY3IiOiIwIiwiZ3JvdXBzIjpbImY1MDU3OGRiLTczYjctNGMzOC05MDAwLTA5MWY4OGQxNjZlNCJdLCJpcGFkZHIiOiIxOTcuMTYuMTY0LjExIiwibmFtZSI6ImxvdWF5a2hyb3VmIiwib2lkIjoiN2ViMzY4Y2QtMDNiYi00NWZmLWI0YjgtZTIxNTRhZGRiNmY5IiwicHVpZCI6IjEwMDMyMDAwNEZEQTE2MzIiLCJyaCI6IjAuQVI4QVRXYlcyN2xPNjBhWjJGeER1aFU4WVVaSWYza0F1dGRQdWtQYXdmajJNQk1mQUc4LiIsInNjcCI6InVzZXJfaW1wZXJzb25hdGlvbiIsInN1YiI6IlZzMWxUUC1NekFkSzJsbU1ZTGtxY0RhRV9YN2RURG9CZHptVDN1SVdFR0kiLCJ0aWQiOiJkYmQ2NjY0ZC00ZWI5LTQ2ZWItOTlkOC01YzQzYmExNTNjNjEiLCJ1bmlxdWVfbmFtZSI6ImxvdWF5a2hyb3VmQGluc2F0LnUtY2FydGhhZ2UudG4iLCJ1cG4iOiJsb3VheWtocm91ZkBpbnNhdC51LWNhcnRoYWdlLnRuIiwidXRpIjoiUy1kY21KUXp1VU9sdGFKSkprRkhBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3RjZHQiOjE1MDQwMTI0NTZ9.FQBSUgd-1FZwA221EriZUjX2I0zFSJodead0LB6vDxlx9lyJU0ClV1ez8yBzW17ReUNl2derCwK486o1E7p-O7LctrxcvU8--fbOq0eI1khEFtXOhJuHuorVqdrEjZrI37S2LizcPRGD-hroytpkb5RBXtPnW3m8kVSnicpK1e-9WbuC8HHbsB4bs1YQv4Vk680ncSrVmpTsA3k8LOcr_F487vRyafrTyQ1cIXAkWa5T7YsipHE40IQ5XHIKA2W-Vfc7noFNBuEYOFG179ATuCZn0FWKzzD1leiImqQFOybalzkgmYRkPH7nW9xmLxN9wIY1c_ZWFCu-hTJEKm3tjw';
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
        const ip = data.value[0]
        setIPpublic(ip.properties.ipAddress);
      })
      .catch(error => {
        console.error(error);
      });
      console.log(IPpublic)
  };
  const deleteVm = async () => {
    const resourceGroupName = `${vmName}-resource-group`;
    try {
      const response = await fetch(`https://management.azure.com/subscriptions/94bdf75f-0db0-45e0-bb43-ff113d14ea1f/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}?api-version=2021-03-01`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${azureAuthToken}`,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      // delete successful
      console.log(`VM ${vmName} deleted successfully!`);
    } catch (error) {
      console.log(`Error deleting VM ${vmName}: ${error}`);
    }
  };
  const ConfigVM = async (name) => {
    //e.preventDefault();
    setVariable(name);
    navigate('/AnsiblePipeline')
    
    try {
      const requestBody = {
        parameter: osType,
        button:name
      };
      
      // Make API request
      const response = await fetch('http://localhost:4000/ansiblepipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      //alert('Form submitted successfully!');
      navigate("/PipelineStatus")

    } catch (error) {
      console.error(error);
      alert('Failed to submit form');
    }
  };
  function conf()
  {
    //handleClick(name);
    ConfigVM();

  }
  return (
    <div>
        <DashboardNavbar></DashboardNavbar>
        <Sidebar></Sidebar>
      <h1 className='VMpage'>VM Page: {vmName}</h1>
      {/* Add VM-specific content here */}
      <div class="card-body">
                  <h5 class="card-title">Region :<span> {vmDetails.location}</span></h5>
                  <h5 class="card-title">IP :<span> {IPpublic}</span></h5> <br></br> 
                  <h5 class="card-title">Configure your VM !</h5>     
                  <h5 class="card-title">Just click and everything will be installed !</h5> <br></br>
                  <h5 class="card-title"><button type="button" class="btn btn-secondary" href="/AnsiblePipeline" onClick={() => ConfigVM('Docker')}>Docker</button> / 
                  <button type="button" class="btn btn-secondary" href="/AnsiblePipeline" onClick={() => ConfigVM('Mysql')} ><i class="fa fa-database" aria-hidden="true" ></i> MySql</button>
                  </h5><br></br>
                  {variable}
                 
                  <h5 class="card-title">To delete the VM click here</h5> 
      <button type="button" onClick={deleteVm} class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete VM</button>

                </div>
                <Monitoring></Monitoring>
                
    </div>
  );
}

export default VMdetails;
