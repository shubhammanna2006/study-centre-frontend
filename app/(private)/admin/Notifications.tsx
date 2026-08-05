"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Trash2, Send } from "lucide-react";

interface Notification {
  id: number;
  type: string;
  priority: string;
  title: string;
  message: string;
  date: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [type, setType] = useState("Exam");
  const [priority, setPriority] = useState("Medium");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("adminNotifications");

    if (data) {
      setNotifications(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "adminNotifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const sendNotification = () => {
    if (!title || !message) {
      alert("Please fill all fields");
      return;
    }

    const newNotification: Notification = {
      id: Date.now(),
      type,
      priority,
      title,
      message,
      date: new Date().toLocaleString(),
    };

    setNotifications([newNotification, ...notifications]);

    setTitle("");
    setMessage("");

    alert("Notification Sent Successfully");
  };

  const deleteNotification = (id: number) => {
    if (confirm("Delete this notification?")) {
      setNotifications(
        notifications.filter((n) => n.id !== id)
      );
    }
  };

  const priorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <section className="gradient-hero text-white rounded-xl">
        <div className="px-8 py-12">
          <Badge className="bg-white/20 text-white border-white/20">
            Admin Panel
          </Badge>

          <h1 className="text-4xl font-bold mt-3">
            Student Notifications
          </h1>

          <p className="text-white/80 mt-2">
            Send important announcements to all students.
          </p>
        </div>
      </section>

      {/* Form */}

      <div className="border rounded-xl p-6 space-y-5">

        <h2 className="text-xl font-semibold">
          Send Notification
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <Label>Notification Type</Label>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Exam">
                  Exam
                </SelectItem>

                <SelectItem value="Class">
                  Class
                </SelectItem>

                <SelectItem value="Class Off">
                  Class Off
                </SelectItem>

                <SelectItem value="Fee Reminder">
                  Fee Reminder
                </SelectItem>

                <SelectItem value="General">
                  General
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>

            <Select
              value={priority}
              onValueChange={setPriority}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">
                  Medium
                </SelectItem>
                <SelectItem value="High">
                  High
                </SelectItem>
                <SelectItem value="Urgent">
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        <div>

          <Label>Title</Label>

          <Input
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

        </div>

        <div>

          <Label>Message</Label>

          <Textarea
            rows={5}
            placeholder="Write your message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
          />

        </div>

        <Button onClick={sendNotification}>
          <Send className="mr-2 h-4 w-4" />
          Send Notification
        </Button>

      </div>

      {/* Notification List */}

      <div className="space-y-4">

        <h2 className="text-2xl font-semibold">
          Sent Notifications
        </h2>

        {notifications.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No Notifications Yet
          </div>
        )}

        {notifications.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-5 shadow-sm"
          >
            <div className="flex justify-between items-start">

              <div>

                <div className="flex gap-2 mb-2">

                  <Badge>{item.type}</Badge>

                  <Badge
                    variant={
                      priorityColor(item.priority) as any
                    }
                  >
                    {item.priority}
                  </Badge>

                </div>

                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>

                <p className="text-muted-foreground mt-2">
                  {item.message}
                </p>

                <p className="text-xs mt-4 text-gray-500">
                  {item.date}
                </p>

              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  deleteNotification(item.id)
                }
              >
                <Trash2 className="text-red-500 h-5 w-5" />
              </Button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}