export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email_verified: boolean | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email_verified?: boolean | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email_verified?: boolean | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          code_style_score: number
          correctness_score: number
          created_at: string
          efficiency_score: number
          feedback_comments: string
          id: string
          overall_score: number
          submission_id: string
        }
        Insert: {
          code_style_score: number
          correctness_score: number
          created_at?: string
          efficiency_score: number
          feedback_comments: string
          id?: string
          overall_score: number
          submission_id: string
        }
        Update: {
          code_style_score?: number
          correctness_score?: number
          created_at?: string
          efficiency_score?: number
          feedback_comments?: string
          id?: string
          overall_score?: number
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      free_trial_usage: {
        Row: {
          created_at: string | null
          feature_type: string
          id: string
          last_used: string | null
          usage_count: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature_type: string
          id?: string
          last_used?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature_type?: string
          id?: string
          last_used?: string | null
          usage_count?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      hr_interview_questions: {
        Row: {
          audio_response_url: string | null
          created_at: string
          evaluation_steps: Json | null
          feedback: string | null
          id: string
          interview_id: string
          question: string
        }
        Insert: {
          audio_response_url?: string | null
          created_at?: string
          evaluation_steps?: Json | null
          feedback?: string | null
          id?: string
          interview_id: string
          question: string
        }
        Update: {
          audio_response_url?: string | null
          created_at?: string
          evaluation_steps?: Json | null
          feedback?: string | null
          id?: string
          interview_id?: string
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_interview_questions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "hr_interviews"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_interviews: {
        Row: {
          company_name: string
          created_at: string
          feedback_pdf_url: string | null
          id: string
          position: string
          status: string
          time_spent_seconds: number | null
          timer_completed: boolean | null
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string
          feedback_pdf_url?: string | null
          id?: string
          position: string
          status?: string
          time_spent_seconds?: number | null
          timer_completed?: boolean | null
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string
          feedback_pdf_url?: string | null
          id?: string
          position?: string
          status?: string
          time_spent_seconds?: number | null
          timer_completed?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_interviews_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hr_interviews_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      interview_responses: {
        Row: {
          created_at: string | null
          evaluation_feedback: string | null
          evaluation_score: number | null
          id: string
          question_id: number | null
          response: string | null
          session_id: string | null
        }
        Insert: {
          created_at?: string | null
          evaluation_feedback?: string | null
          evaluation_score?: number | null
          id?: string
          question_id?: number | null
          response?: string | null
          session_id?: string | null
        }
        Update: {
          created_at?: string | null
          evaluation_feedback?: string | null
          evaluation_score?: number | null
          id?: string
          question_id?: number | null
          response?: string | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "interview_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_sessions: {
        Row: {
          created_at: string | null
          end_time: string | null
          id: string
          start_time: string | null
          total_score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          total_score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          total_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          created_by: string
          id: string
          is_admin_notification: boolean | null
          message: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          is_admin_notification?: boolean | null
          message: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          is_admin_notification?: boolean | null
          message?: string
          title?: string
        }
        Relationships: []
      }
      organization_registrations: {
        Row: {
          created_at: string
          created_by: string
          csv_file_url: string
          id: string
          org_address: string
          org_email: string
          org_name: string
          unique_code: string
        }
        Insert: {
          created_at?: string
          created_by: string
          csv_file_url: string
          id?: string
          org_address: string
          org_email: string
          org_name: string
          unique_code: string
        }
        Update: {
          created_at?: string
          created_by?: string
          csv_file_url?: string
          id?: string
          org_address?: string
          org_email?: string
          org_name?: string
          unique_code?: string
        }
        Relationships: []
      }
      peer_groups: {
        Row: {
          created_at: string
          created_by: string
          id: string
          members: string[]
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          members: string[]
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          members?: string[]
          name?: string
        }
        Relationships: []
      }
      peer_sessions: {
        Row: {
          created_at: string
          created_by: string
          date: string
          end_time: string
          group_id: string | null
          id: string
          questions: string[]
          session_code: string
          start_time: string
        }
        Insert: {
          created_at?: string
          created_by: string
          date: string
          end_time: string
          group_id?: string | null
          id?: string
          questions: string[]
          session_code: string
          start_time: string
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          end_time?: string
          group_id?: string | null
          id?: string
          questions?: string[]
          session_code?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "peer_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "peer_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          college: string | null
          created_at: string
          email: string | null
          id: string
          name: string | null
          profile_image_url: string | null
          updated_at: string
        }
        Insert: {
          college?: string | null
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          profile_image_url?: string | null
          updated_at?: string
        }
        Update: {
          college?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          profile_image_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      question_test_cases: {
        Row: {
          created_at: string
          expected_output: string
          id: string
          input: string
          is_hidden: boolean | null
          question_id: string
        }
        Insert: {
          created_at?: string
          expected_output: string
          id?: string
          input: string
          is_hidden?: boolean | null
          question_id: string
        }
        Update: {
          created_at?: string
          expected_output?: string
          id?: string
          input?: string
          is_hidden?: boolean | null
          question_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          examples: Json
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty: string
          examples?: Json
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          examples?: Json
          id?: string
          title?: string
        }
        Relationships: []
      }
      submissions: {
        Row: {
          approach: string
          code: string
          created_at: string
          evaluation_feedback: string | null
          evaluation_score: number | null
          grammar_feedback: string | null
          id: string
          language: string
          question_id: string
          session_id: string
          space_complexity: string
          test_cases: string
          time_complexity: string
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          approach: string
          code: string
          created_at?: string
          evaluation_feedback?: string | null
          evaluation_score?: number | null
          grammar_feedback?: string | null
          id?: string
          language: string
          question_id: string
          session_id: string
          space_complexity: string
          test_cases: string
          time_complexity: string
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          approach?: string
          code?: string
          created_at?: string
          evaluation_feedback?: string | null
          evaluation_score?: number | null
          grammar_feedback?: string | null
          id?: string
          language?: string
          question_id?: string
          session_id?: string
          space_complexity?: string
          test_cases?: string
          time_complexity?: string
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "peer_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_questions: {
        Row: {
          created_at: string
          difficulty: string
          expected_answer: string | null
          id: string
          question: string
          topic_id: string
        }
        Insert: {
          created_at?: string
          difficulty: string
          expected_answer?: string | null
          id?: string
          question: string
          topic_id: string
        }
        Update: {
          created_at?: string
          difficulty?: string
          expected_answer?: string | null
          id?: string
          question?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "technical_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_responses: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          question_id: string
          response: string
          score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          question_id: string
          response: string
          score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          question_id?: string
          response?: string
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "technical_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      technical_topics: {
        Row: {
          created_at: string
          description: string | null
          id: string
          parent_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          parent_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          parent_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "technical_topics_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "technical_topics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          notification_id: string | null
          read_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_id?: string | null
          read_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          notification_id?: string | null
          read_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          payment_id: string | null
          payment_provider: string | null
          start_date: string | null
          subscription_type:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_id?: string | null
          payment_provider?: string | null
          start_date?: string | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          payment_id?: string | null
          payment_provider?: string | null
          start_date?: string | null
          subscription_type?:
            | Database["public"]["Enums"]["subscription_type"]
            | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      daily_user_scores: {
        Row: {
          average_score: number | null
          submission_date: string | null
          user_id: string | null
        }
        Relationships: []
      }
      user_statistics: {
        Row: {
          college: string | null
          email: string | null
          name: string | null
          total_interviews: number | null
          total_practice_sessions: number | null
          total_submissions: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      increment_trial_usage: {
        Args: {
          feature: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      subscription_type: "free" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never