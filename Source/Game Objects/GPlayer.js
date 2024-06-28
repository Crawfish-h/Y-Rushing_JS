class GPlayer extends GFighter_Object
{
    constructor(x= 0, y= 0, health= 100, image= "", tag= "", name= "")
    {
        super(x, y, health, image, tag, name);
        FInput_Handler.Object_Input_List.push(this);
        FInput_Handler.Object_Click_List.push(this);
        this.On_Input = this.Player_Input;
        this.On_Tick = this.Player_Tick;
        this.On_Click = this.Player_On_Click;
        this.Camera;
        this.Sprite_Sheet_Length = 5;
        this.Object_Size.Width = 30;
        this.Object_Size.Height = 36;
    }

    Player_Tick()
    {
        this.Player_States();
        //console.log("Current Anim: " +  this.Current_Animation);
    }

    Player_On_Click()
    {
        if (this.Is_Attacking == false)
        {
            let trigger;
            if (this.Is_Facing_Right == true)
            {
                trigger = new GTrigger_Base(this.X + 20, this.Y, this, { Width: 10, Height: 10 }, 
                    [FUtility.Object_Tags.Enemy, FUtility.Object_Tags.Breakable], 
                    FUtility.Object_Tags.Damage_Trigger, "Damage_Trigger");
            }else
            {
                trigger = new GTrigger_Base(this.X - 50, this.Y, this, { Width: 10, Height: 10 }, 
                    [FUtility.Object_Tags.Enemy, FUtility.Object_Tags.Breakable], 
                    FUtility.Object_Tags.Damage_Trigger, "Damage_Trigger");
            }
            
            setTimeout(trigger.Destroy.bind(trigger), 1000);

            this.Is_Attacking = true;
            setTimeout(this.Attack_End.bind(this), this.Frame_Speed * this.Animations.Attack.length);
        }
    }

    Player_States()
    {
        if (this.Is_Being_Damaged == true)
        {
            this.Current_Animation = this.Animations.Damaged;
            return;
        }

        if (this.Is_Attacking == true)
        {
            this.Current_Animation = this.Animations.Attack;
            return;
        }

        if (this.Is_Moving == true)
        {
            this.Current_Animation = this.Animations.Run;
        }

        if ((this.Is_Moving || this.Is_Attacking || this.Is_Being_Damaged) == false)
        {
            this.Current_Animation = this.Animations.Idle;
        }
    }

    Player_Input()
    {
        this.Is_Moving = false;
        if (FInput_Handler.Key_Map.w == true)
        {
            this.Move_Y(-this.Move_Speed, ()=>
                {
                    this.Camera.Y += this.Move_Speed;
                    this.Is_Moving = true;
                }
            );
        }

        if (FInput_Handler.Key_Map.s == true)
        {
            this.Move_Y(this.Move_Speed, ()=>
                {
                    this.Camera.Y -= this.Move_Speed; 
                    this.Is_Moving = true;
                }
            );
        }

        if (FInput_Handler.Key_Map.d == true)
        {
            this.Move_X(this.Move_Speed, ()=>
                {
                    this.Camera.X -= this.Move_Speed; 
                    this.Is_Moving = true;
                }
            );

            if (this.Is_Facing_Right == false)
            {
                this.Current_Frame[0] = 5;
                this.Frame_Index = 5;
            }

            this.Image.src = TResource_Loader.Image_List.Player_Sprites_Right;
            this.Is_Facing_Right = true;
        }

        if (FInput_Handler.Key_Map.a == true)
        {
            this.Move_X(-this.Move_Speed, ()=>
                {
                    this.Camera.X += this.Move_Speed; 
                    this.Is_Moving = true;
                }
            );

            if (this.Is_Facing_Right == true)
            {
                this.Current_Frame[0] = 0;
                this.Frame_Index = 0;
            }

            this.Image.src = TResource_Loader.Image_List.Player_Sprites_Left;
            this.Is_Facing_Right = false;
        }

        
        

        /*switch (event.key)
        {
            case "w":
                console.log("Player up");
                this.Y -= this.Player_Speed;
                break;
            case "s":
                console.log("Player up");
                this.Y += this.Player_Speed;
                break;
            case "d":
                console.log("Player up");
                this.X += this.Player_Speed;
                break;
            case "a":
                console.log("Player up");
                this.X -= this.Player_Speed;
                break;
            default:
                break;
        }*/
    }
}