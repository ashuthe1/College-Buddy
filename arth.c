#include<stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct Node
{
    char usn[10];
    char name[10];
    struct Node *next;
    struct Node *pre;
}node;

typedef struct Node *N;
node *head=NULL;

void insert()
{
    N ptr=(N)malloc(sizeof(node));
    N temp=head;
    if(ptr==NULL)
    {
        printf("Overflow\n");
        return;
    }
    printf("Enter USN and Name \n");
    scanf("%s%s",ptr->usn,ptr->name);
    if(head==NULL)
    {
        head=ptr;
        ptr->next=NULL;
        ptr->pre=NULL;
    }
    else
    {while(temp->next!=NULL)
        temp=temp->next;
        temp->next=ptr;
        ptr->pre=temp;
        ptr->next=NULL;
    }
}

void delete()
{
    char Usn[10];
    int f=0;
    node *temp=head;
    if(head==NULL)
    {
        printf("Its empty \n\n");
        return;
    }
    printf("Enter USN to be deleted \n");
    scanf("%s",Usn);
    while(temp->next!=NULL)
    {
        if(!strcmp(temp->usn,Usn))
        {
            f=1;
            break;
        }
        temp=temp->next;
    }
    if(f==0)
        {
            printf("USN:%s not found\n",Usn);
        }
        else
        {
            if(head->next==NULL)
            free(head);
            else if(temp->next==NULL)
            {
            temp->pre->next=NULL;
            free(temp);
            }
            else
            {
                temp->pre->next=temp->next;
                temp->next->pre=temp->pre;
                free(temp);
            }
            printf("USN:%s is deleted \n",Usn);
        }
}
void display()
{
    node *temp=head;
    while(temp!=NULL)
    {
        printf("USN:%s \nName:%s \n\n",temp->usn,temp->name);
        temp=temp->next;
    }
}

int main()
{
    int ch;
    printf("Menu\n\n");
    while(1)
    {
        printf("1.Insert \n2.Delete USN \n3.Display \n4.Exit \n");
        scanf("%d",&ch);
        switch(ch)
        {
            case 1: insert();
                break;
            case 2: delete();
                break;
            case 3: display();
                break;
            case 4: exit(0);
            default: printf("\nInvalid option\n");
        }
    }
    return(0);
}