import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthHeaders } from "@/api/auth";

const API_URL = "http://localhost:5000/api/users";

export default function UserDirectory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(API_URL, getAuthHeaders())
      .then(res => setUsers(res.data.users))
      .catch(err => console.error(err));
  }, []);

  const followUser = async (id) => {
    await axios.post(`${API_URL}/follow`, { targetId: id }, getAuthHeaders());
    alert("Followed!");
  };

  const addToCommunity = async (id, communityId) => {
    await axios.post(`/api/communities/invite`, 
      { targetId: id, communityId },
      getAuthHeaders()
    );
    alert("Invite sent!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map(u => (
          <Card key={u._id}>
            <CardContent className="p-4">
              <p className="font-semibold">{u.firstName} {u.lastName}</p>
              <p className="text-gray-500 text-sm">Class: {u.classGrade}</p>
              <div className="flex gap-2 mt-3">
                <Button onClick={() => followUser(u._id)}>Follow</Button>
                <Button variant="outline" onClick={() => addToCommunity(u._id, "YOUR_COMMUNITY_ID")}>
                  Add to Community
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
