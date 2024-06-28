class GImage_Object extends YGame_Object
{
    constructor(x= 0, y= 0, image= "", tag= "", name= "")
    {
        super(x, y, tag, name);

        this.Image = new Image();
        this.Image.src = image;
        this.Image_Size = { Width: FRenderer.Frame_Size, Height: FRenderer.Frame_Size};
        this.Image_Offset = { X: 0, Y: 0 };
        this.Animations = { Idle: [[0, 0]] }; // 0th element: x frame, 1st element: y frame, 2nd element: frame speed.
        this.Current_Animation = this.Animations.Idle; 
        this.Frame_Index = 0;
        this.Current_Frame = this.Current_Animation[this.Frame_Index];
        this.Current_Anim_Timer = null;
        this.Frame_Speed = 100; // How long a frame is played in an animation in milliseconds.
        this.Is_Facing_Right = false;

        FRenderer.Render_List.push(this);

        this.Current_Anim_Timer = setInterval(this.Next_Anim_Frame.bind(this), this.Frame_Speed);
    }

    Set_Size(size_Width, size_Height)
    {
        this.Image_Size.Width = size_Width;
        this.Image_Size.Height = size_Height;

        this.Object_Size.Width = size_Width;
        this.Object_Size.Height = size_Height;
    }

    Play_Anim()
    {
        //setInterval(this.Next_Anim_Frame, this.Current_Frame[2] * 1000);
    }

    Play_Anim_Old()
    {
        this.Frame_Index = 0;
        //this.Current_Frame = this.Current_Animation[0];

        if (this.Current_Anim_Timer != null)
        {
            clearInterval(this.Current_Anim_Timer);
            this.Current_Anim_Timer = null;
        }

        if (this.Frame_Index < this.Current_Animation.length - 1)
        {
            this.Current_Anim_Timer = setInterval(this.Next_Anim_Frame, this.Current_Frame[2] * 1000);
        }
    }

    
    Next_Anim_Frame()
    {
        if (this.Frame_Index > this.Current_Animation.length - 1)
        {
            this.Frame_Index = this.Current_Animation.length - 1;
        }

        this.Current_Frame = structuredClone(this.Current_Animation[this.Frame_Index]);

        if (this.Frame_Index < this.Current_Animation.length - 1)
        {
            this.Frame_Index++;
        }else
        {
            this.Frame_Index = 0;
        }

        if (this.Is_Facing_Right == true)
        {
            this.Current_Frame[0] = 5 - this.Current_Frame[0];
        }
    }
}